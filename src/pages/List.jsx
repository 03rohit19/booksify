import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/Firebase";

const List = () => {
  const [name, setName] = useState("");
  const [isbnNumber, setIsbnNumber] = useState("");
  const [price, setPrice] = useState("");
  const [coverPic, setCoverPic] = useState(null); // Set to null to store a file object

  const firebase = useFirebase();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", {
      name,
      isbnNumber,
      price,
      coverPic,
    });

    try {
      const result = await firebase.handleCreateNewListing(
        name,
        isbnNumber,
        price,
        coverPic
      );
      console.log("Document successfully created:", result);
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    }
  };
  return (
    <div className="container mt-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Enter Book Name</Form.Label>
          <Form.Control
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Book name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicIsbn">
          <Form.Label>ISBN</Form.Label>
          <Form.Control
            onChange={(e) => setIsbnNumber(e.target.value)}
            value={isbnNumber}
            type="text"
            placeholder="ISBN number"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            type="text"
            placeholder="Enter price"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCoverPic">
          <Form.Label>Cover photo</Form.Label>
          <Form.Control
            onChange={(e) => setCoverPic(e.target.files[0])} // Directly set the selected file
            type="file"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form>
    </div>
  );
};

export default List;

// import React, { useState } from "react";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import { useFirebase } from "../context/Firebase";

// const List = () => {
//   const [name, setName] = useState("");
//   const [isbnNumber, setIsbnNumber] = useState("");
//   const [price, setPrice] = useState("");
//   const [coverPic, setCoverPic] = useState(null);

//   const firebase = useFirebase();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Form submitted with data:", {
//       name,
//       isbnNumber,
//       price,
//       coverPic,
//     });

//     try {
//       const result = await firebase.handleCreateNewListing(
//         name,
//         isbnNumber,
//         price,
//         coverPic
//       );
//       console.log("Document successfully created:", result);
//     } catch (error) {
//       console.error("Error in handleSubmit:", error);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <Form onSubmit={handleSubmit}>
//         <Form.Group className="mb-3" controlId="formBasicEmail">
//           <Form.Label>Enter Book Name</Form.Label>
//           <Form.Control
//             onChange={(e) => setName(e.target.value)}
//             value={name}
//             type="text"
//             placeholder="Book name"
//           />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="formBasicIsbn">
//           <Form.Label>ISBN</Form.Label>
//           <Form.Control
//             onChange={(e) => setIsbnNumber(e.target.value)}
//             value={isbnNumber}
//             type="text"
//             placeholder="ISBN number"
//           />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="formBasicPrice">
//           <Form.Label>Price</Form.Label>
//           <Form.Control
//             onChange={(e) => setPrice(e.target.value)}
//             value={price}
//             type="text"
//             placeholder="Enter price"
//           />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="formBasicCoverPic">
//           <Form.Label>Cover photo</Form.Label>
//           <Form.Control
//             onChange={(e) => setCoverPic(e.target.files[0])}
//             type="file"
//           />
//         </Form.Group>

//         <Button variant="primary" type="submit">
//           Create
//         </Button>
//       </Form>
//     </div>
//   );
// };

// export default List;
