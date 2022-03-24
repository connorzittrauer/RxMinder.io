import React, { useState, useEffect } from 'react'
import APIService from './APIService'

function AddButton(props) {
const [showForm, setFormStatus] = useState(false);

const viewData = () => setFormStatus(true);

return (
  <div>
    {/* <a href="#adduser" onClick={viewData}>Add new user</a> */}
    <button onClick={viewData}>Add Another Prescription</button>
    {showForm && (
      <form>
        <input />
        <input />
        <button type="submit">submit</button>
      </form>
    )}
  </div>
);
}

export default AddButton