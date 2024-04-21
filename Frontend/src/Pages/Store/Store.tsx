import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usercontext } from "../../Context/User Details/User_details";
import "../Store/Store.css";

export const showContext = createContext<boolean | any>(false);

type store_data = {
  contact_number: string;
  location: string;
  store_id: number;
  store_name: string;
};

const url = "http://127.0.0.1:5000/get_store";

const Store = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [store_data, setStoreData] = useState<store_data[]>([]);

  const [user, setUser] = useContext(usercontext);
  console.log(user);
  const getAllStores = async () => {
    try {
      const resp = await axios.post(url, { user_id: user.user });
      const data = resp.data;
      setStoreData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const goToStore = (id: number) => {
    try {
      setUser({ ...user, store: id });
      if (user.store != 0 && user.store != undefined) {
        navigate("/store/Customers");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteStore = async (id: number) => {
    try {
      const resp = await axios.delete(url + "/" + id);
      console.log("Delete");
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    getAllStores();
  }, []);

  return (
    <>
      <showContext.Provider value={[show, setShow]}>
        {show ? <AddStore /> : <>{}</>}
        <div className="main-container">
          <div className="sub-container">
            <div className="store-container">
              <div className="store-heading">
                <p>Stores</p>
                <button
                  className="add-store-button2"
                  onClick={() => setShow(true)}
                >
                  +
                </button>
              </div>

              <div className="table-container">
                <table className="table-main">
                  <tr>
                    <th>Store ID</th>
                    <th>Store Name</th>
                    <th>Store Location</th>

                    <th>Contact Number</th>
                    <th>Actions</th>
                  </tr>
                  {/* <tr className="table-row">
                    <td>Store ID</td>
                    <td>Store Name</td>
                    <td>Store Location</td>
                    <td>Store Type</td>
                    <td>Contact Number</td>
                    <td>
                      <button>View</button>
                    </td>
                  </tr> */}
                  {store_data &&
                    Array.isArray(store_data) &&
                    store_data.map((data: store_data) => {
                      return (
                        <tr className="table-row">
                          <td>{data.store_id}</td>
                          <td>{data.store_name}</td>
                          <td>{data.location}</td>

                          <td>{data.contact_number}</td>
                          <td>
                            <button onClick={() => goToStore(data.store_id)}>
                              View
                            </button>
                            <button onClick={() => deleteStore(data.store_id)}>
                              delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </table>
              </div>
            </div>
          </div>
        </div>
      </showContext.Provider>
    </>
    // <>
    //   <AddStore />
    // </>
  );
};

const AddStore = () => {
  const [show, setShow] = useContext(showContext);
  return (
    <div className="add-main-container">
      <div className="add-sub-container">
        <div className="mini-container">
          <p style={{ fontWeight: "bold" }}>ADD new Store</p>
          <button className="x_button" onClick={() => setShow(false)}>
            X
          </button>

          <form id="AddForm">
            <input type="text" placeholder="" />
            <input type="text" />
            <button onClick={() => setShow(false)}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Store;
