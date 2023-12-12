import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import contactsData from '../contacts.json';

Modal.setAppElement('#root');

const Problem2 = () => {
  const [modalAIsOpen, setModalAIsOpen] = useState(false);
  const [modalBIsOpen, setModalBIsOpen] = useState(false);
  const [modalCIsOpen, setModalCIsOpen] = useState(false);
  const [onlyEvenA, setOnlyEvenA] = useState(false);
  const [onlyEvenB, setOnlyEvenB] = useState(false);
  const [searchTermA, setSearchTermA] = useState('');
  const [searchTermB, setSearchTermB] = useState('');
  const [contactsA, setContactsA] = useState([]);
  const [contactsB, setContactsB] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  const openModalA = () => {
    setModalAIsOpen(true);
    setModalBIsOpen(false);
    setModalCIsOpen(false);
    setSearchTermA('');
  };

  const openModalB = () => {
    setModalAIsOpen(false);
    setModalBIsOpen(true);
    setModalCIsOpen(false);
    setSearchTermB('');
  };

  const openModalC = (contact) => {
    setModalCIsOpen(true);
    setSelectedContact(contact);
  };

  const closeModal = () => {
    setModalAIsOpen(false);
    setModalBIsOpen(false);
    setModalCIsOpen(false);
  };

  const handleCheckboxChangeA = () => {
    setOnlyEvenA(!onlyEvenA);
  };

  const handleCheckboxChangeB = () => {
    setOnlyEvenB(!onlyEvenB);
  };

  useEffect(() => {
    setContactsA(contactsData.filter((contact) => (!onlyEvenA || contact.id % 2 === 0)));
  }, [modalAIsOpen, onlyEvenA]);

  useEffect(() => {
    setContactsB(
      contactsData
        .filter((contact) => contact.country.name === 'United States')
        .filter((contact) => (!onlyEvenB || contact.id % 2 === 0))
    );
  }, [modalBIsOpen, onlyEvenB]);

  

  const handleScroll = (event, setContacts, searchTerm) => {
    const target = event.target;
    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      console.log('Loading next page...');
      const nextPage = contactsData.slice(20, 40);
      setContacts((prevContacts) => [...prevContacts, ...nextPage]);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-9">
          <button
            className="btn btn-lg btn-outline-primary"
            type="button"
            style={{ backgroundColor: '#46139f', color: 'white' }}
            onClick={openModalA}
          >
            All Contacts
          </button>
          <button
            className="btn btn-lg btn-outline-warning"
            type="button"
            style={{ backgroundColor: '#ff7f50', color: 'white' }}
            onClick={openModalB}
          >
            US Contacts
          </button>
        </div>

        {/* Modal A */}
        <Modal isOpen={modalAIsOpen} onRequestClose={closeModal}>
          <div>
            <button onClick={openModalA}>All Contacts</button>
            <button onClick={openModalB}>US Contacts</button>
            <button onClick={closeModal} style={{ backgroundColor: '#46139f', color: 'white' }}>
              Close
            </button>
          </div>
          <input type="checkbox" className='mr-5' onChange={handleCheckboxChangeA} checked={onlyEvenA} />
          <label className='ml-5'>Only even</label>
          
          <div onScroll={(e) => handleScroll(e, setContactsA, searchTermA)}>
            {contactsA.map((contact) => (
              <div key={contact.id} onClick={() => openModalC(contact)}>
                {contact.phone}
              </div>
            ))}
          </div>
        </Modal>

        {/* Modal B */}
        <Modal isOpen={modalBIsOpen} onRequestClose={closeModal}>
          <div>
            <button onClick={openModalA}>All Contacts</button>
            <button onClick={openModalB}>US Contacts</button>
            <button onClick={closeModal} style={{ backgroundColor: '#46139f', color: 'white' }}>
              Close
            </button>
          </div>
          <input type="checkbox" onChange={handleCheckboxChangeB} checked={onlyEvenB} />
          <label>Only even</label>
          
          <div onScroll={(e) => handleScroll(e, setContactsB, searchTermB)}>
            {contactsB.map((contact) => (
              <div key={contact.id} onClick={() => openModalC(contact)}>
                {contact.phone}
              </div>
            ))}
          </div>
        </Modal>

        {/* Modal C */}
        <Modal isOpen={modalCIsOpen} onRequestClose={closeModal}>
          <div>
            <button onClick={closeModal}>Close</button>
            {selectedContact && (
              <div>
                <p>Contact Details:</p>
                <p>ID: {selectedContact.id}</p>
                <p>Phone: {selectedContact.phone}</p>
                <p>Country: {selectedContact.country.name}</p>
              </div>
            )}
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Problem2;