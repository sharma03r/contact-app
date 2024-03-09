import React, { useEffect, useState } from "react";
import axios from "axios";
import ContactItem from "../Component/ContactItem";

function ContactList() {
  const [contactList, setContactList] = useState([]);
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
  });
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((data) => {
        console.log(data);
        setContactList(data.data);
      })
      .catch((err) => {
        console.log(`Error fetching the list ${err}`);
      });
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setContact((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("thos", contact);
    const updatedContact = contactList.find(
      (item) => item.phone === contact.phone
    );
    if (updatedContact) {
      axios
        .put(
          `https://jsonplaceholder.typicode.com/users/${updatedContact.id}`,
          { contact }
        )
        .then((res) => {
          console.log(res);
          const updatedContactList = contactList.map((contact) =>
            contact.id === updatedContact.id ? res.data.contact : contact
          );
          setContactList(updatedContactList);
        })
        .catch((err) => {
          console.log(`Error updating the contact ${err}`);
        });
    } else {
      axios
        .post("https://jsonplaceholder.typicode.com/users", {
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
        })
        .then((res) => {
          setContactList([...contactList, res.data]);
        })
        .catch((err) => {
          console.log(`Error updating the ${err}`);
        });
    }
    setContact({
      name: "",
      email: "",
      phone: "",
    });
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => {
        console.log(res);
        const updatedContactList = contactList.filter((contact) => {
          return contact.id !== id;
        });
        setContactList(updatedContactList);
      })
      .catch((err) => {
        console.log(`Error deleting the contact ${err}`);
      });
  };

  return (
    <section className="contact-app">
      <aside>
        <fieldset>
          <legend>New Contact</legend>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="name"
            onChange={handleChange}
            value={contact.name}
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="xyz@company.com"
            value={contact.email}
            onChange={handleChange}
          />
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="phone"
            onChange={handleChange}
            value={contact.phone}
          />
          <input type="submit" value="Add Contact" onClick={handleSubmit} />
        </fieldset>
      </aside>
      <div className="contactlist-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {contactList.map((contact, index) => (
              <ContactItem
                contact={contact}
                key={contact.id}
                handleDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ContactList;
