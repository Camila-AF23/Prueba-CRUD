import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const token = localStorage.getItem("token");

  const [contacts, setContacts] = useState([]);

  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Traer contactos
  const getContacts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/contact", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setContacts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Crear contacto
  const createContact = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/contact",
        {
          lastname,
          email,
          phone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setLastname("");
      setEmail("");
      setPhone("");

      getContacts();
    } catch (error) {
      console.error(error);
    }
  };

  // Eliminar contacto
  const deleteContact = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/contact/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      getContacts();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Bienvenida {user.name} 😎</h1>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          navigate("/");
        }}
      >
        Cerrar sesión
      </button>

      <hr />

      <h2>Crear contacto</h2>

      <form
        onSubmit={createContact}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "300px",
        }}
      >
        <input
          type="text"
          placeholder="Apellido"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Teléfono"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button type="submit">Crear contacto</button>
      </form>

      <hr />

      <h2>Lista de contactos</h2>

      {contacts.map((contact: any) => (
        <div
          key={contact.id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>{contact.lastname}</h3>

          <p>{contact.email}</p>

          <p>{contact.phone}</p>

          <button onClick={() => deleteContact(contact.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}
