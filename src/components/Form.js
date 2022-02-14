import React from 'react'
import { useState } from 'react'

import { Loading } from './Loading';

export const Form = ({addData, postLoading}) => {

const [type, setType] = useState("") ;
console.log("type data", type);

const [form, setForm] = useState({
    name: "",
    description: "",
    nominal: 0,
});

const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
};

const { name, description, nominal } = form;

const clearForm = () => {
    setType("");
    setForm({
        name: "",
        description:"",
        nominal:0,
    });
};

const onSubmit = (e) => {
    e.preventDefault();
    addData({
        name,
        description,
        type,
        nominal: +nominal,
        createdAt: new Date().toISOString()
    });

    alert(JSON.stringify(form, null, 2));
    clearForm();
};

const typeString = type === "income" ? "Pemasukan" :type === "expense" ? "Pengeluaran" : "";

  return (
    <div>
        <form className="px-2 py-2" onSubmit={onSubmit}>
            <div className="form-group mb-3">
                <label>Pilih Tipe</label>
                <select 
                    className="form-control" 
                    value={type} 
                    onChange={(e) => setType(e.target.value)}
                >
                    <option >Pilih Tipe</option>
                    <option value="income">Pemasukan</option>
                    <option value="expense">Pengeluaran</option>
                </select>
            </div>
            <div className="form-group ">
                <label>Input Nama{" "}
                {typeString}
                </label>
                <input
                    name="name"
                    onChange={onChange}
                    value={name}
                    type="text"
                    className="form-control"
                    placeholder={`Nama dari ${typeString}
                    `}
                    disabled={!type}
                />
            </div>
            <div className="form-group mb-3">
                <label>Deskripsi</label>
                <textarea 
                    name="description"
                    onChange={onChange}
                    value={description}
                    disabled={!type}
                    className="form-control" 
                    placeholder={`Deskripsi dari ${typeString}`}>
                </textarea>
            </div>
            <div className="form-group mb-3">
                <label>Nominal</label>
                <input 
                    name="nominal"
                    type="number"
                    onChange={onChange}
                    value={nominal}
                    disabled={!type}
                    className="form-control" 
                    placeholder={`Nominal ${typeString}`}>
                </input>
            </div>
            <div className="form-group mb-3 mt-3">
                <button className="btn btn-primary w-100" disabled={!type|| postLoading}>
                    Simpan {postLoading && <Loading/>}
                </button>
            </div>
        </form>
    </div>
  )
}

