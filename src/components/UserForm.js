import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import './UserForm.css'; // Import your CSS file for styling

const UserForm = () => {
  // State to hold user information
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    address: '',
    phone: '',
    occupation: '',
    company: '',
    gender: '',
    country: '',
    notes: ''
  });

  const [submittedData, setSubmittedData] = useState([]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData([...submittedData, formData]);
    setFormData({
      name: '',
      email: '',
      age: '',
      address: '',
      phone: '',
      occupation: '',
      company: '',
      gender: '',
      country: '',
      notes: ''
    });
  };

  // Export data to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(submittedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
    XLSX.writeFile(workbook, 'user_data.xlsx');
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Information</h2>
      <form onSubmit={handleSubmit} className="user-form">
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required className="form-input" />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required className="form-input" />
        </label>
        <label>
          Age:
          <input type="number" name="age" value={formData.age} onChange={handleChange} required className="form-input" />
        </label>
        <label>
          Address:
          <input type="text" name="address" value={formData.address} onChange={handleChange} className="form-input" />
        </label>
        <label>
          Phone:
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="form-input" />
        </label>
        <label>
          Occupation:
          <input type="text" name="occupation" value={formData.occupation} onChange={handleChange} className="form-input" />
        </label>
        <label>
          Company:
          <input type="text" name="company" value={formData.company} onChange={handleChange} className="form-input" />
        </label>
        <label>
          Gender:
          <select name="gender" value={formData.gender} onChange={handleChange} className="form-input">
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <label>
          Country:
          <input type="text" name="country" value={formData.country} onChange={handleChange} className="form-input" />
        </label>
        <label>
          Notes:
          <textarea name="notes" value={formData.notes} onChange={handleChange} className="form-input"></textarea>
        </label>
        <button type="submit" className="submit-button">Submit</button>
      </form>

      {submittedData.length > 0 && (
        <button onClick={exportToExcel} className="export-button">
          Export to Excel
        </button>
      )}
    </div>
  );
};

export default UserForm;
