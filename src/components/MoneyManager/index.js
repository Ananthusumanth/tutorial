import {Component} from 'react'
import './index.css'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here
class MoneyManager extends Component {
  state = {
    title: '',
    amount: '',
    type: transactionTypeOptions[0].optionId,
    yourBalance: 0,
    yourIncome: 0,
    yourExpenses: 0,
    transactionsList: [],
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amount: event.target.value})
  }

  onChangeType = event => {
    this.setState({type: event.target.value})
  }

  addTransaction = event => {
    event.preventDefault()
    const {title, amount, type, transactionsList} = this.state
    if (title && amount) {
      const newTransaction = {
        id: uuidv4(),
        title,
        amount: parseInt(amount),
        type,
        transactionsList,
      }
      this.setState(prev => {
        const updatedTransactionsList = [
          ...prev.transactionsList,
          newTransaction,
        ]

        if (type === 'INCOME') {
          return {
            yourBalance: prev.yourBalance + parseInt(amount),
            yourIncome: prev.yourIncome + parseInt(amount),
            transactionsList: updatedTransactionsList,
            title: '',
            amount: '',
            type: 'INCOME',
          }
        }
        return {
          yourBalance: prev.yourBalance - parseInt(amount),
          yourExpenses: prev.yourExpenses + parseInt(amount),
          transactionsList: updatedTransactionsList,
          title: '',
          amount: '',
          type: 'INCOME',
        }
      })
    }
  }

  deleteTransaction = id => {
    this.setState(prevState => {
      const filteredTransactions = prevState.transactionsList.filter(
        transaction => transaction.id !== id,
      )

      const deletedTransaction = prevState.transactionsList.find(
        transaction => transaction.id === id,
      )

      let updatedBalance = prevState.yourBalance
      let updatedIncome = prevState.yourIncome
      let updatedExpenses = prevState.yourExpenses

      if (deletedTransaction.type === 'INCOME') {
        updatedIncome -= parseInt(deletedTransaction.amount)
        updatedBalance -= parseInt(deletedTransaction.amount)
      } else {
        updatedExpenses -= parseInt(deletedTransaction.amount)
        updatedBalance += parseInt(deletedTransaction.amount)
      }

      return {
        transactionsList: filteredTransactions,
        yourBalance: updatedBalance,
        yourIncome: updatedIncome,
        yourExpenses: updatedExpenses,
      }
    })
  }

  render() {
    const {
      title,
      amount,
      type,
      yourBalance,
      yourExpenses,
      yourIncome,
      transactionsList,
    } = this.state

    return (
      <div className="bg-container">
        <div className="card-container">
          <div className="section1">
            <h1>Hi, Richard</h1>
            <p>
              Welcome back to your
              <span className="spanmoney"> Money Manager</span>
            </p>
          </div>
          <div className="section2">
            <MoneyDetails
              balance={yourBalance}
              expenses={yourExpenses}
              income={yourIncome}
            />
          </div>
          <div className="section3">
            <div className="section3-1">
              <form className="form" onSubmit={this.addTransaction}>
                <h1>Add Transaction</h1>
                <label htmlFor="title">TITLE</label>
                <input
                  type="text"
                  placeholder="Title"
                  id="title"
                  value={title}
                  className="input"
                  onChange={this.onChangeTitle}
                />
                <label htmlFor="amount">AMOUNT</label>
                <input
                  type="text"
                  id="amount"
                  placeholder="Amount"
                  value={amount}
                  className="input"
                  onChange={this.onChangeAmount}
                />
                <label htmlFor="type">TYPE</label>
                <select
                  id="type"
                  className="input"
                  onChange={this.onChangeType}
                  value={type}
                >
                  {transactionTypeOptions.map(each => (
                    <option key={each.optionId} value={each.optionId}>
                      {each.displayText}
                    </option>
                  ))}
                </select>
                <button type="submit" className="buttonAdd">
                  Add
                </button>
              </form>
            </div>
            <div className="section3-2">
              <div>
                <h1>History</h1>
              </div>
              <ul className="list">
                <li className="th">
                  <p className="titlepara">Title</p>
                  <p className="Amountpara">Amount</p>
                  <p className="typepara">Type</p>
                </li>
                {transactionsList.map(transaction => (
                  <TransactionItem
                    key={transaction.id}
                    transaction={transaction}
                    deleteTransaction={this.deleteTransaction}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
