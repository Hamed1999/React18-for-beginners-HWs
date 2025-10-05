import ListGroup from "./components/ListGroup";
import Alert from "./components/Alert";
import Button from "./components/Button";
import { useEffect, useState } from "react";
import Like from "./components/Like";
import produce from "immer";
import ExpandableText from "./components/ExpandableText";
import Form from "./components/Form";
import ExpenseForm from "./expense-tracker/components/ExpenseForm";
import ExpenseFilter from "./expense-tracker/components/ExpenseFilter";
import { string } from "zod";
import { FieldValues } from "react-hook-form";
import userService, { User, CanceledError } from "./services/user-service";
import useUser from "./hooks/useUser";

function App() {
  let items = [
    "New York",
    "San Fransisco",
    "Esfahan",
    "Tehran",
    "Tokyo",
    "London",
  ];
  const handleSelectItem = (item: string) => {
    console.log(item);
  };
  const handleClick = () => {
    console.log("Alert button clicked!");
    setAlertVisibility(true);
    // setPizza({ ...pizza, toppings: [...pizza.toppings, "Cheese"] });
    setPizza(
      produce((draft) => {
        draft.toppings.push("Cheese");
      })
    );
  };

  const handleAlert = () => {
    setAlertVisibility(false);
  };

  const [alertVisibile, setAlertVisibility] = useState(false);

  const alert = (
    <Alert onClose={handleAlert}>
      <strong>Holy guacamole!</strong> You should check in on some of those
      fields below.
    </Alert>
  );

  const [game, setGame] = useState({ id: 1, player: { name: "Mosh" } });
  const onClick = () => {
    console.log("Like Clicked!");

    // let playerName = "Mosh";
    // if (game.player.name === playerName) playerName = "Hamed";
    // setGame({ ...game, player: { ...game.player, name: playerName } });
    setGame(
      produce((draft) => {
        draft.player.name = draft.player.name === "Mosh" ? "Hamed" : "Mosh";
      })
    );

    // setCart({
    //   ...cart,
    //   items: cart.items.map((item) =>
    //     item.id === 1 ? { ...item, quantity: ++item.quantity } : item
    //   ),
    // });
    setCart(
      produce((draft) => {
        const item = draft.items.find((item) => item.id === 1);
        if (item) item.quantity++;
      })
    );
  };

  const [pizza, setPizza] = useState({
    name: "Spicy Pepperoni",
    toppings: ["Mushroom"],
  });

  const [cart, setCart] = useState({
    discount: 0.2,
    items: [
      { id: 1, title: "Prouct1", quantity: 1 },
      { id: 2, title: "Prouct2", quantity: 1 },
    ],
  });

  const cartItems = cart.items.map(
    (obj) => obj.title + " quantity: " + obj.quantity.toString()
  );

  const [expenses, setExpenses] = useState<FieldValues[]>([]);

  
  /* --------------------------------------------------------------------------------- */


  const { users, error, isLoading, setUsers, setError } = useUser();
  /* ------------------------ CRUD Operations (Optimistic) --------------------------- */
  const handleDeleteUser = (userId: number) => {
    const originalUsers = [...users];
    setUsers(users.filter((user) => user.id !== userId));
    userService.delete(userId).catch((error) => {
      setError(error.message);
      setUsers(originalUsers);
    });
  };
  const addUser = () => {
    const originalUsers = [...users];
    const newUser = {
      id: 0,
      name: "Hamed Salmanizadegan",
      address: { city: "Esfahan" },
    };
    setUsers([newUser, ...users]);
    userService
      .create<User>(newUser)
      .then(({ data: newUser }) => {
        setUsers([newUser, ...users]);
      })
      .catch((error) => {
        setError(error.message);
        setUsers(originalUsers);
      });
  };
  const handleUpdateUser = (user: User) => {
    const originalUsers = [...users];
    const updatedUser = { ...user, name: user.name + " : )" };
    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));
    userService.update<User>(updatedUser).catch((error) => {
      setError(error.message);
      setUsers(originalUsers);
    });
  };
  /* --------------------------------------------------------------------------------- */
  return (
    <div>
      {isLoading && <div className="spinner-border"></div>}
      {error && <p className="text-danger">{error}</p>}
      <button className="btn btn-primary" onClick={addUser}>
        Add User
      </button>
      <ul className="list-group">
        {users.map((user) => (
          <li
            className="list-group-item d-flex justify-content-between align-items-center"
            key={user.id}
          >
            {user.name}
            <div>
              <button
                className="btn btn-secondary mx-3"
                onClick={() => handleUpdateUser(user)}
              >
                Update
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => handleDeleteUser(user.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {alertVisibile && alert}
      <ListGroup
        items={!error ? users.map((user) => user.address.city) : items}
        heading="Cities"
        onSelectItem={handleSelectItem}
      />
      <Button color="success" onClick={handleClick} optionalClass="mx-1 my-2">
        Alert Button & Add Pizza Topings
      </Button>

      <p key={game.id}>
        Player Name: {game.player.name}{" "}
        <span>
          <Like onClick={onClick} />
        </span>
      </p>
      <ListGroup
        items={pizza.toppings}
        heading={pizza.name + " Toppings: "}
        onSelectItem={handleSelectItem}
      />
      <ListGroup
        items={cartItems}
        heading={"Cart discount = " + cart.discount}
        onSelectItem={handleSelectItem}
      />
      <ExpandableText maxChars={410}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
        commodo lacinia orci, sit amet congue leo congue auctor. Quisque
        convallis urna eget massa fermentum congue. Donec pretium est in commodo
        eleifend. Donec aliquam congue urna, sed imperdiet massa consequat ut.
        Nunc placerat orci aliquet, dignissim diam in, convallis erat. Sed
        varius velit nec nulla porta varius. Cras viverra scelerisque ornare.
        Nam eget nisi eu urna efficitur feugiat eget et nulla. Suspendisse
        rhoncus, odio a bibendum dictum, urna ligula ornare ligula, eu
        vestibulum ante orci imperdiet mauris. Nullam aliquet lacinia gravida.
        Donec aliquet diam vel felis porttitor placerat. Curabitur sit amet nunc
        lectus. Phasellus et blandit lorem, sed interdum arcu. Cras tristique
        lectus at erat lobortis, a viverra neque porttitor. Phasellus feugiat
        auctor erat et porta. Suspendisse potenti. Duis sollicitudin elit lorem,
        vel iaculis sapien interdum non. Integer et risus finibus, semper dui
        sit amet, hendrerit magna. Phasellus ut hendrerit purus. Donec auctor
        pretium elementum. Nunc nec congue eros. Nam eu mattis dui, sit amet
        tincidunt urna. Duis sagittis laoreet ligula. Nullam non ex sit amet
        diam tempor convallis. Vivamus at convallis augue. Maecenas lacinia
        lorem id nunc laoreet tincidunt. Duis suscipit neque quis nunc eleifend
        iaculis. Suspendisse non sem consequat, facilisis elit vel, sagittis
        dui. Phasellus sed mi sollicitudin est hendrerit porta. Vestibulum
        venenatis dolor nibh, eget fringilla dui imperdiet quis. Duis molestie
        finibus ligula, a aliquam diam finibus ac. Pellentesque ullamcorper
        purus neque, sed eleifend metus tincidunt sit amet. Morbi et nulla
        mattis, bibendum neque eu, vulputate ex. Etiam sed felis vulputate,
        sollicitudin leo non, volutpat justo. Etiam ac vulputate tortor, non
        egestas erat. Phasellus placerat nisi id augue tristique blandit.
        Vivamus quis ligula interdum, molestie leo et, accumsan metus. Donec
        fringilla at turpis vel bibendum. Pellentesque habitant morbi tristique
        senectus et netus et malesuada fames ac turpis egestas. Vivamus rutrum
        mauris sagittis vehicula finibus. Nam ut aliquam lacus. Quisque tempor
        cursus nibh, non facilisis ipsum cursus blandit. Nam sed consequat
        massa. Sed ac justo lorem. Cras eu augue erat. Integer id libero a purus
        mollis ullamcorper et sit amet massa. Etiam mattis, urna id posuere
        pretium, augue justo laoreet nunc, ut auctor ligula justo sed ex. Nullam
        facilisis maximus erat sed feugiat. Suspendisse pellentesque rutrum
        ligula ac accumsan. Morbi in nisi nec tellus blandit accumsan vitae quis
        velit. Nunc consectetur ut turpis congue maximus. Vivamus quis vulputate
        est, eu mollis orci.
      </ExpandableText>

      <ExpenseForm onAddExpense={setExpenses} />
      <ExpenseFilter expenses={expenses} onDeleteExpense={setExpenses} />
    </div>
  );
}

export default App;
