import ListGroup from "./components/ListGroup";
import Alert from "./components/Alert";
import Button from "./components/Button";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import { BsFillCalendarFill } from "react-icons/bs";
import Like from "./components/Like";
import Form from "./components/Form";
import ExpenseList from "./expense-tracker/components/ExpenseList";
import ExpenseFilter from "./expense-tracker/components/ExpenseFilter";
import ExpenseForm from "./expense-tracker/components/ExpenseForm";
import categories from "./expense-tracker/categories";
import ProductList from "./expense-tracker/components/ProductList";
import apiClient, { CanceledError } from "./services/api-client";
import userService, { User } from "./services/user-service";
import useUsers from "./hooks/useUsers";

function AppListGroup() {
  let items = ["New York", "San Francisco", "Tokyo", "London", "Paris"];

  const handleSelectItem = (item: string) => {
    console.log(item);
  };
  return (
    <div>
      <ListGroup
        items={items}
        heading={"Cities"}
        onSelectItem={handleSelectItem}
      />
    </div>
  );
}

function AppAlert() {
  return (
    <div>
      <Alert>
        Hello <span>World</span>
      </Alert>
    </div>
  );
}

function AppButton() {
  const [alertVisible, setAlertVisiblity] = useState(false);

  return (
    <div>
      {alertVisible && (
        <Alert onClose={() => setAlertVisiblity(false)}>My alert</Alert>
      )}
      <Button color="primary" onClick={() => setAlertVisiblity(true)}>
        My Button
      </Button>
    </div>
  );
}

function AppReactIcons() {
  return (
    <div>
      <BsFillCalendarFill color="red" size="40" />
    </div>
  );
}

function AppButton2() {
  return (
    <div>
      <Button onClick={() => {}}>My Button</Button>
    </div>
  );
}

function AppLike() {
  return (
    <div>
      <Like onClick={() => console.log("clicked")} />
    </div>
  );
}

function AppForm() {
  return (
    <div>
      <Form />
    </div>
  );
}

function AppExpenseTracker() {
  const [selectedCategory, setSelectedCategoty] = useState("");
  const [expenses, setExpenses] = useState([
    { id: 1, description: "aa", amount: 10, category: "Groceries" },
    { id: 2, description: "bb", amount: 10, category: "Utilities" },
    { id: 3, description: "cc", amount: 10, category: "Utilities" },
    { id: 4, description: "dd", amount: 10, category: "Entertainment" },
  ]);

  const visibleExpenses = selectedCategory
    ? expenses.filter((e) => e.category === selectedCategory)
    : expenses;

  return (
    <div>
      <div className="mb-5">
        {/* <ExpenseForm onSubmit={(data) => console.log(data)} /> */}
        <ExpenseForm
          onSubmit={(expense) =>
            setExpenses([...expenses, { ...expense, id: expenses.length + 1 }])
          }
        />
      </div>
      <div className="mb-3">
        <ExpenseFilter
          onSelectCategory={(category) => setSelectedCategoty(category)}
        />
      </div>
      <ExpenseList
        expenses={visibleExpenses}
        onDelete={(id) => setExpenses(expenses.filter((e) => e.id != id))}
      />
    </div>
  );
}

function AppEffectHook() {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.focus();
  });

  useEffect(() => {
    document.title = "My App";
  });

  return (
    <div>
      <input type="text" className="form-control" />
    </div>
  );
}

function AppEffectDependencies() {
  const [category, setCategory] = useState("");
  // useEffect(() => {});

  return (
    <div>
      <select
        name=""
        id=""
        className="form-select"
        onChange={(event) => setCategory(event.target.value)}
      >
        <option value=""></option>
        <option value="Clothing">Clothing</option>
        <option value="Household">Household</option>
      </select>
      <ProductList category={category} />
    </div>
  );
}

function AppEffectCleanUp() {
  const connect = () => console.log("Connecting");
  const disconnect = () => console.log("Disconnecting");

  useEffect(() => {
    connect();

    return () => disconnect();
  });

  return <div></div>;
}

// interface User {
//   id: number;
//   name: string;
// }

function App() {
  // const [users, setUsers] = useState<User[]>([]);
  // const [error, setError] = useState("");
  // const [isLoading, setLoading] = useState(false);

  // useEffect(() => {
  //   //   const controller = new AbortController();

  //   //   setLoading(true);
  //   //   apiClient
  //   //     .get<User[]>("/users", {
  //   //       signal: controller.signal,
  //   //     })
  //   //     .then((res) => {
  //   //       setUsers(res.data);
  //   //       setLoading(false);
  //   //     })
  //   //     .catch((err) => {
  //   //       if (err instanceof CanceledError) return;
  //   //       setError(err.message);
  //   //       setLoading(false);
  //   //     });

  //   //   return () => controller.abort();

  //   setLoading(true);
  //   // const { request, cancel } = userService.getAllUsers();
  //   const { request, cancel } = userService.getAll<User>();
  //   request
  //     .then((res) => {
  //       setUsers(res.data);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       if (err instanceof CanceledError) return;
  //       setError(err.message);
  //       setLoading(false);
  //     });

  //   return () => cancel();
  // }, []);

  const { users, error, isLoading, setUsers, setError } = useUsers();

  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    setUsers(users.filter((u) => u.id !== user.id));

    // apiClient.delete("/users/" + user.id).catch((err) => {
    //   setError(err.message);
    //   setUsers(originalUsers);
    // });

    // userService.deleteUser(user.id).catch((err) => {
    userService.delete(user.id).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };

  const addUser = () => {
    const originalUsers = [...users];
    const newUser = { id: 0, name: "Salahuddin Hairai" };
    setUsers([newUser, ...users]);

    // apiClient
    //   .post("/users/", newUser)
    //   .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
    //   .catch((err) => {
    //     setError(err.message);
    //     setUsers(originalUsers);
    //   });

    userService
      // .createUser(newUser)
      .create(newUser)
      .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  const updateUser = (user: User) => {
    const originalUsers = [...users];
    const updatedUser = { ...user, name: user.name + "!" };
    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));

    // apiClient.patch("/users/" + user.id, updatedUser).catch((err) => {
    //   setError(err.message);
    //   setUsers(originalUsers);
    // });

    // userService.updateUser(updatedUser).catch((err) => {
    userService.update(updatedUser).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const res = await axios.get<User[]>(
  //         "https://jsonplaceholder.typicode.com/users"
  //       );
  //       setUsers(res.data);
  //     } catch (err) {
  //       setError((err as AxiosError).message);
  //     }
  //   };

  //   fetchUsers();
  // }, []);

  return (
    <>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="spinner-border"></div>}
      <button className="btn btn-primary mb-3" onClick={addUser}>
        Add
      </button>
      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between"
          >
            {user.name}
            <div>
              <button
                className="btn btn-outline-secondary mx-1"
                onClick={() => updateUser(user)}
              >
                Update
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => deleteUser(user)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

function App2() {
  return <div></div>;
}

export default App;
