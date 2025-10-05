

# React Course for Beginners — Homeworks 

This repository contains my **solutions, trainings, and homeworks** from the **[React Course for Beginners](https://codewithmosh.com/p/ultimate-react-part1)** by *Code with Mosh*.

> A hands-on, step-by-step guide to building modern web applications using **React 18+** and **TypeScript**.

---

## 🚀 Getting Started

To run the projects in this repository locally:

1. **Clone the repository**:

```bash
git clone https://github.com/Hamed1999/react-app.git
cd react-app
```

2. **Install dependencies**:

```bash
npm install
```

3. **Start the development server**:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app. The page reloads automatically on code changes.

---

## 📘 Course Overview

The course covers essential React concepts and TypeScript integration:

* Component architecture & hierarchy
* State management & props
* Event handling
* Forms and validation
* Reusable and modular components
* TypeScript types, interfaces, and generics
* API integration and CRUD operations

---

## 🎯 Key Features Demonstrated in Projects

### 1. **Dynamic List Handling**

* Implemented with `ListGroup` component
* Handles selection and interaction with items

### 2. **Alert & Notifications**

* Custom `Alert` component with close functionality

### 3. **State Management & Immutability**

* Demonstrated with `useState` and **Immer** for immutability
* Example: managing pizza toppings, shopping cart items, and game player state

### 4. **Like & Expandable Text Components**

* `Like` component toggles state dynamically
* `ExpandableText` handles long text content with "read more" functionality

### 5. **Expense Tracker**

* Components: `ExpenseForm` and `ExpenseFilter`
* Add, filter, and remove expenses dynamically

### 6. **User CRUD Operations (Optimistic Updates)**

* Custom hook `useUser` for API integration
* `userService` handles create, update, and delete requests
* Optimistic UI updates with rollback on errors

### 7. **TypeScript Features**

* Strong typing for components, props, and state
* Usage of `FieldValues`, interfaces, and type-safe service calls

---

## 🛠 Example Component Usage

```tsx
<ListGroup
  items={users.map(u => u.address.city)}
  heading="Cities"
  onSelectItem={handleSelectItem}
/>

<Button color="success" onClick={handleClick}>
  Alert Button & Add Pizza Toppings
</Button>

<ExpandableText maxChars={410}>
  {/* Long description text */}
</ExpandableText>
```

* **CRUD Operations for Users**:

```ts
const addUser = () => { /* optimistic create */ };
const handleUpdateUser = (user: User) => { /* optimistic update */ };
const handleDeleteUser = (userId: number) => { /* optimistic delete */ };
```

---

## 🔗 Course Link

👉 [Ultimate React Course (Part 1)](https://codewithmosh.com/p/ultimate-react-part1)

---

## 📂 Technologies Used

* **React 18+**
* **TypeScript**
* **Bootstrap 5** (for styling)
* **Immer** (for immutable state updates)
* **React Hook Form & Zod** (for forms and validation)
* **Custom Hooks** (for API calls and state management)

---

## 👤 Author

**Hamed Salmanizadegan**
📍 [GitHub Profile](https://github.com/Hamed1999)
Building **type-safe and maintainable React applications** with TypeScript.



