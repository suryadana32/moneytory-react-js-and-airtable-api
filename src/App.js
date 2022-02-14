import axios from "axios";
import { useState, useEffect } from "react";
import { Form } from "./components/Form";
import { List } from "./components/List";

const App = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [postLoading, setPostLoading] = useState(false);

  const getDataFromAirTable = async () => {
    try {
      const config ={
        headers: {
          Authorization: "Bearer keyJMRvZ5ov9XAngu",
        },
      };

      setLoading(true);
      const response = await axios.get("https://api.airtable.com/v0/appFRDzjB24hA08RU/transaksi?maxRecords=20&view=Grid%20view",
      config
      );

      const newData = response.data.records.map((item) => ({
        id: item.id,
        name: item.fields.name,
        description: item.fields.description,
        nominal: item.fields.nominal,
        type: item.fields.type,
      }));

      setData(newData);
    } catch (error) {
      console.log(error);
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataFromAirTable();
  }, []);

  const addData = async (newData) => {
    try {

      const sendData = JSON.stringify({
        records: [
          {
            fields: newData,
          },
        ],
      });

      const config = {
        headers: {
          Authorization: "Bearer keyJMRvZ5ov9XAngu",
          "Content-Type": "application/json",
        },
      };

      setPostLoading(true);

      const response = await axios.post("https://api.airtable.com/v0/appFRDzjB24hA08RU/transaksi",
      sendData,
        config);

      const responseData = response.data.records[0];

      const fixData = {
        id: responseData.id,
        name: responseData.fields.name,
        description: responseData.fields.description,
        nominal: responseData.fields.nominal,
        type: responseData.fields.type,
      };

      setData([...data, fixData]);
    } catch (error) {
      console.log(error);
    } finally {
      setPostLoading(false);
    };
  };

  const removeData = async (id) => {
    
    try {
      const axiosParams = {
        method: "delete",
        url: `https://api.airtable.com/v0/appFRDzjB24hA08RU/transaksi/${id}`,
        headers: {
          Authorization: "Bearer keyJMRvZ5ov9XAngu",
          "Content-Type": "application/json",
        },
      };

      setLoading(true);

      await axios(axiosParams);

      const newData = data.filter((item) => item.id !== id);

      setData(newData);
      alert("berhasil deleted data");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container text-white">
      <h1 className="text-center">App Keuangan</h1>
      <h2 className="text-center">By <b>Eka Suryadana</b></h2>
     <div className="row">
      <div className="d-flex justify-content-center align-items-center mb-4 mt-5">
        <img
          src="image.svg"
          alt="banner"
          style={{
            objectFit: "scale-down",
            width: "11rem",
            
          }}
        />
      </div>
     </div>
     <div className="row">
      <div className="col-4">
        <List data={data} type="income" bg="primary" removeData={removeData} loading={loading}/>
      </div>
      <div className="col-4">
        <Form addData={addData} postLoading={postLoading}/>
      </div>
      <div className="col-4">
        <List data={data} type="expense" bg="success" removeData={removeData} loading={loading}/>
      </div>
     </div>
      
    </div>
  );
};

export default App;