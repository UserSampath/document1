import React, { useEffect, useState } from "react";
import "./UserDocuments.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import DocumentCard from "../../components/DocumentCard/DocumentCard";
import axios from "axios";
const UserDocuments = () => {
  const { userId } = useParams();
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      await axios
        .get(`http://localhost:8000/user/getDocumentsOfUser/${userId}`)
        .then((response) => {
          console.log(response.data.result);
          if (response.data.success) {
            setDocuments(response.data.result.Documents);
        
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchDocuments();
  }, [userId]);

  const navigate = useNavigate();
  return (
    <div
      className="documentBackground"
      style={{
        minHeight: "100vh",
        paddingTop: "20px",
        paddingBottom: "40px",
      }}>
      <h2 style={{ textAlign: "center" }}>Your Documents</h2>
      <div className="container document_container p-5">
        <div
          className=" d-flex  justify-content-center "
          style={{ flexWrap: "wrap" }}>
          {documents &&
            documents.map((document, key) => {
              return (
                <div key={key}>
                  <DocumentCard document={document} userId={userId} />
                </div>
              );
            })}

          {!documents ||
            (documents.length == 0 && (
              <div>
                <h3>No any documents found</h3>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default UserDocuments;
