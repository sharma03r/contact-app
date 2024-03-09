import axios from "axios";
import React from "react";

function ContactItem({ contact, handleDelete }) {
  return (
    <tr>
      <td>{contact.name}</td>
      <td>{contact.email}</td>
      <td>{contact.phone}</td>
      <td>
        <button onClick={() => handleDelete(contact.id)}>X</button>
      </td>
    </tr>
  );
}

export default ContactItem;
