// Write your code here
import './index.css'

const TransactionItem = props => {
  const {transaction, deleteTransaction} = props
  const {id, title, amount, type} = transaction

  const onDelete = () => {
    deleteTransaction(id)
  }

  return (
    <li className="td">
      <p>{title}</p>
      <p>Rs {amount}</p>
      <p>{type}</p>
      <button
        type="button"
        className="delete"
        data-testid="delete"
        onClick={onDelete}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          className="deleteImg"
        />
      </button>
    </li>
  )
}

export default TransactionItem
