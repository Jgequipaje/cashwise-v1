import { useState } from "react";

const initialExpenseList = [];

export default function App() {
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [expenseNewList, setExpenseNewList] = useState(initialExpenseList);
  const totalSpent = expenseNewList.reduce(
    (total, expense) => total + expense.price,
    0
  );

  function handleShowExpensePopUp() {
    setShowAddExpense(!showAddExpense);
  }

  function handleAddExpenseNewList(expensive) {
    setExpenseNewList((expenseNewList) => [...expenseNewList, expensive]);
  }

  function handleRemoveAnExpense(expenseId) {
    setExpenseNewList((prevExpenses) =>
      prevExpenses.filter((expense) => expense.id !== expenseId)
    );
  }

  return (
    <div className="app">
      <Header />
      <LandingPage
        handleOnClick={handleShowExpensePopUp}
        expenseNewList={expenseNewList}
        totalSpent={totalSpent}
      />
      <RecentTransactions
        expenses={expenseNewList}
        handleRemoveAnExpense={handleRemoveAnExpense}
        totalSpent={totalSpent}
      />
      {showAddExpense && (
        <AddExpensePopUp
          showAddExpense={showAddExpense}
          handleOnClick={setShowAddExpense}
          handleAddExpenseNewList={handleAddExpenseNewList}
          expenseNewList={expenseNewList}
        />
      )}
    </div>
  );
}

function Header() {
  return (
    <header>
      <h1 className="logo">Cashwise</h1>
      <p className="copyright">&copy; Jeffrey Equipaje</p>
    </header>
  );
}

function LandingPage({ handleOnClick, expenseNewList, totalSpent }) {
  return (
    <section className="landing-page">
      <TotalExpense expenseNewList={expenseNewList} totalSpent={totalSpent} />
      <SpendingWallet totalSpent={totalSpent} />
      <div className="add-expense-or-topup">
        <AddExpense handleOnClick={handleOnClick} />
        <TopUp />
      </div>
    </section>
  );
}

function TotalExpense({ totalSpent }) {
  return (
    <div>
      <p className="you-spent">You spent</p>
      <h2 className="you-spent-number">₱ {totalSpent.toFixed(2)}</h2>
    </div>
  );
}

function SpendingWallet({ totalSpent }) {
  const totalBalance = parseFloat((1200 - totalSpent).toFixed(2));

  return (
    <div className="spending-wallet-container">
      <p className="wallet-svg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
          />
        </svg>
        Spending Wallet
      </p>
      <span>₱{totalBalance}</span>
    </div>
  );
}

function AddExpense({ handleOnClick }) {
  return (
    <div className="addexpense-container">
      <button className="button" onClick={handleOnClick}>
        Add an expense
      </button>
    </div>
  );
}

function TopUp() {
  return (
    <div className="addexpense-container">
      <button className="button top-up-btn">Top-up Wallet</button>
    </div>
  );
}

function RecentTransactions({ expenses, handleRemoveAnExpense, totalSpent }) {
  return (
    <section className="recent-container">
      {totalSpent === 0 ? (
        <div className="add-expense-now">
          <h5>No expenses yet</h5>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
            />
          </svg>
        </div>
      ) : (
        <h5 className="recent">Recent Transactions</h5>
      )}
      <div className="recent-transactions">
        <ul>
          <ExpenseList
            expenses={expenses}
            handleRemoveAnExpense={handleRemoveAnExpense}
          />
        </ul>
      </div>
    </section>
  );
}

function ExpenseList({ expenses, handleRemoveAnExpense }) {
  return (
    <>
      {expenses.map((expense) => (
        <li key={expense.id} className="expense-list">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6 redesign"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>

          <div>
            <h5 className="name-of-expense">{expense.name}</h5>
            <p className="date-of-expense">{expense.date}</p>
          </div>
          <div className="price">- ₱{expense.price}</div>
          <button
            className="remove-button"
            onClick={() => handleRemoveAnExpense(expense.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6 effect"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
        </li>
      ))}
    </>
  );
}

function AddExpensePopUp({ handleAddExpenseNewList, handleOnClick }) {
  const [nameOfExpense, setNameOfExpense] = useState("");
  const [priceOfExpense, setPriceOfExpense] = useState("");

  function exitClick() {
    handleOnClick(false);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const parsedPrice = parseFloat(priceOfExpense);

    if (!nameOfExpense || isNaN(parsedPrice) || parsedPrice <= 0) {
      handleOnClick(false);
      // alert("Please enter a valid value.");
      return;
    }

    const id = crypto.randomUUID();
    const newExpense = {
      id,
      name: nameOfExpense,
      image: "",
      date: new Date().toLocaleDateString("en-GB"),
      price: parsedPrice,
    };

    handleAddExpenseNewList(newExpense);
    handleOnClick(false);
    setNameOfExpense("");
    setPriceOfExpense(0);
  }

  return (
    <>
      <button onClick={exitClick} className="exit-button">
        ❌
      </button>
      <form className="expense-pop-up" onSubmit={handleSubmit}>
        <h4 className="add-expense">Add Expense</h4>
        <h4 className="for-text">For:</h4>
        <input
          type="text"
          placeholder="Merchant (e.g. Apple)"
          value={nameOfExpense}
          onChange={(e) => setNameOfExpense(e.target.value)}
        ></input>
        <h4 className="price-text">Price :</h4>
        <input
          placeholder="Price"
          type="number"
          value={priceOfExpense}
          onChange={(e) => setPriceOfExpense(e.target.value)}
          step="0.01"
        ></input>
        <button className="submit-button">submit</button>
      </form>
    </>
  );
}
