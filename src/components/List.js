import React from 'react';
import { FaTrash } from "react-icons/fa";
import { Loading } from './Loading';

export const List = (props) => {

  const filteredData = props.data?.filter((item)=> item.type === props.type);

  const formatToRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { 
      style: 'currency', 
      currency: 'IDR' 
    }).format(number);
  };

  return (
    <div className={`bg-${props.bg} mb-5 pb-3`} style={{
      borderRadius:"10px",
    }}>
      <h2 className='text-white text-center'>
        {props.type === "expense" ? "Pengeluaran": "Pemasukan"}
      </h2>
      {props.loading ? <Loading/> :<>
      <h3 className='text-center text-white'>
        {formatToRupiah(filteredData?.reduce((acc, curr) =>  acc + curr.nominal, 0))}
      </h3>
        <ul className='list-group mt-3'>
            {filteredData?.map((item) => (
                <li className='d-flex justify-content-between list-group-item' key={item.id}>
                  <span>{item.name}</span>
                  <div>
                    <span>{formatToRupiah(item.nominal)}</span>
                    <FaTrash
                      className='text-danger'
                      size={16}
                      style={{
                        marginLeft: "10px",
                        cursor: "pointer",
                      }}
                      onClick={() => props.removeData(item.id)}
                    />
                  </div>

                </li>
            ))}
        </ul></> }
      
    </div>
  );
};

export default List;
