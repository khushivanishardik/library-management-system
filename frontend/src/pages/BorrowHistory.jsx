import {
  useEffect,
  useState,
} from "react";

import {
  getBorrowHistory,
  getAllBorrowHistory,
} from "../services/borrowService";

import DashboardLayout from "../components/DashboardLayout";

const BorrowHistory = () => {
  const [history, setHistory] =
    useState([]);

  useEffect(() => {
    const loadHistory =
      async () => {
        try {

          const user =
            JSON.parse(
              localStorage.getItem(
                "user"
              )
            );

          let data;

          if (
            user?.role ===
            "manager"
          ) {
            data =
              await getAllBorrowHistory();
          } else {
            data =
              await getBorrowHistory();
          }

          setHistory(data);

        } catch (error) {
          console.log(error);
        }
      };

    loadHistory();
  }, []);

  const user =
    JSON.parse(
      localStorage.getItem(
        "user"
      )
    );

  return (
    <DashboardLayout>

      <h1>
        📜 Borrow History
      </h1>

      {history.map((item) => (

        <div
          key={item._id}
          className="activity-card"
        >

          {user?.role ===
          "manager" ? (

            <>
              <h3>
                {item.book?.title}
              </h3>

              <p>
                Student:
                {" "}
                {item.user?.name}
              </p>

              <p>
                Email:
                {" "}
                {item.user?.email}
              </p>

              <p>
                Borrow Date:
                {" "}
                {new Date(
                  item.borrowDate
                ).toLocaleDateString()}
              </p>
            </>

          ) : (

            <>
              <h3>
                {item.book?.title}
              </h3>

              <p>
                Status:
                {" "}
                {item.returned
                  ? "Returned"
                  : "Borrowed"}
              </p>

              <p>
                Borrow Date:
                {" "}
                {new Date(
                  item.borrowDate
                ).toLocaleDateString()}
              </p>
            </>

          )}

        </div>

      ))}

    </DashboardLayout>
  );
};

export default BorrowHistory;