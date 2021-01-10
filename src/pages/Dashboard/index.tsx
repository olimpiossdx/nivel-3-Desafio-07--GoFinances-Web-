import React, { useState, useEffect } from 'react';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi'

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

import api from '../../services/api';

import Header from '../../components/Header';

import formatValue from '../../utils/formatValue';

import { Container, CardContainer, Card, TableContainer } from './styles';

interface Transaction {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  category: { title: string };
  created_at: string;
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface IOrder {
  item: string;
  selected: boolean;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>({} as Balance);
  const [orderBy, setOrderBy] = useState<IOrder>({ item: '', selected: false });

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      api.get<{ balance: Balance, transactions: Transaction[] }>('transactions').then(response => {
        setTransactions(response.data.transactions);
        setBalance(response.data.balance);
      });
    }

    loadTransactions();
  }, []);

  const handleOrderBy = (order: 'titulo' | 'preco' | 'categoria' | 'data', state: boolean) => {

    if (order === 'titulo') {
      if (state) {
        transactions.sort(function (transactionA, transactionB) {
          if (transactionA.title > transactionB.title) {
            return 1;
          }
          if (transactionA.title < transactionB.title) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
      } else {
        transactions.sort(function (transactionA, transactionB) {
          if (transactionA.title < transactionB.title) {
            return 1;
          }
          if (transactionA.title > transactionB.title) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
      }

      setTransactions(transactions);

      setOrderBy({ item: order, selected: state });
      return;
    }

    if (order === 'preco') {
      if (state) {
        transactions.sort(function (transactionA, transactionB) {

          if (formatValue(transactionA.value) < formatValue(transactionB.value)) {
            return 1;
          }
          if (formatValue(transactionA.value) > formatValue(transactionB.value)) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
      } else {
        transactions.sort(function (transactionA, transactionB) {
          if (formatValue(transactionA.value) > formatValue(transactionB.value)) {
            return 1;
          }
          if (formatValue(transactionA.value) < formatValue(transactionB.value)) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
      }

      setTransactions(transactions);

      setOrderBy({ item: order, selected: state });
      return;
    }

    if (order === 'categoria') {
      if (state) {
        transactions.sort(function (transactionA, transactionB) {
          if (transactionA.category.title < transactionB.category.title) {
            return 1;
          }
          if (transactionA.category.title > transactionB.category.title) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
      } else {
        transactions.sort(function (transactionA, transactionB) {
          if (transactionA.category.title > transactionB.category.title) {
            return 1;
          }
          if (transactionA.category.title < transactionB.category.title) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
      }

      setTransactions(transactions);

      setOrderBy({ item: order, selected: state });
      return;
    }
    if (order === 'data') {
      if (state) {
        transactions.sort(function (transactionA, transactionB) {
          if (new Date(transactionA.created_at) > new Date(transactionB.created_at)) {
            return 1;
          }
          if (new Date(transactionA.created_at) < new Date(transactionB.created_at)) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
      } else {
        transactions.sort(function (transactionA, transactionB) {
          if (new Date(transactionA.created_at) < new Date(transactionB.created_at)) {
            return 1;
          }
          if (new Date(transactionA.created_at) > new Date(transactionB.created_at)) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
      }

      setTransactions(transactions);
      setOrderBy({ item: order, selected: state });
      return;
    }
    setOrderBy({ item: '', selected: false });
  }

  return (<>
    <Header />
    <Container>
      <CardContainer>
        <Card>
          <header>
            <p>Entradas</p>
            <img src={income} alt='Income' />
          </header>
          <h1 data-testid='balance-income'>{balance.income && formatValue(balance.income)}</h1>
        </Card>
        <Card>
          <header>
            <p>Saídas</p>
            <img src={outcome} alt='Outcome' />
          </header>
          <h1 data-testid='balance-outcome'>{balance.outcome && formatValue(balance.outcome)}</h1>
        </Card>
        <Card total>
          <header>
            <p>Total</p>
            <img src={total} alt='Total' />
          </header>
          <h1 data-testid='balance-total'>{balance.total && formatValue(balance.total)}</h1>
        </Card>
      </CardContainer>

      <TableContainer>
        <table>
          <thead>
            <tr>
              <th onClick={() => { handleOrderBy('titulo', !orderBy.selected) }} style={{ cursor: 'pointer' }}>
                Título {orderBy.item === 'titulo' && orderBy.selected ? (<FiChevronUp style={{ margin: '-3px 12px', color: '#FF872C' }} />) : (<FiChevronDown style={{ margin: '-3px 12px' }} />)}
              </th>
              <th onClick={() => { handleOrderBy('preco', !orderBy.selected) }} style={{ cursor: 'pointer' }}>
                Preço {orderBy.item === 'preco' && orderBy.selected ? (<FiChevronUp style={{ margin: '-3px 12px', color: '#FF872C' }} />) : (<FiChevronDown style={{ margin: '-3px 12px' }} />)}
              </th>
              <th onClick={() => { handleOrderBy('categoria', !orderBy.selected) }} style={{ cursor: 'pointer' }}>
                Categoria {orderBy.item === 'categoria' && orderBy.selected ? (<FiChevronUp style={{ margin: '-3px 12px', color: '#FF872C' }} />) : (<FiChevronDown style={{ margin: '-3px 12px' }} />)}
              </th>
              <th onClick={() => { handleOrderBy('data', !orderBy.selected) }} style={{ cursor: 'pointer' }}>
                Data  {orderBy.item === 'data' && orderBy.selected ? (<FiChevronUp style={{ margin: '-3px 12px', color: '#FF872C' }} />) : (<FiChevronDown style={{ margin: '-3px 12px' }} />)}
              </th>
            </tr>
          </thead>

          <tbody>
            {transactions.map(transaction =>
              transaction.type === 'income' ? (<tr key={transaction.id}>
                <td className='title'>{transaction.title}</td>
                <td className='income'>{formatValue(transaction.value)}</td>
                <td>{transaction.category.title}</td>
                <td>{new Date(transaction.created_at).toLocaleDateString()}</td>
              </tr>) :
                (<tr key={transaction.id}>
                  <td className='title'>{transaction.title}</td>
                  <td className='outcome'>- {formatValue(transaction.value)}</td>
                  <td>{transaction.category.title}</td>
                  <td>{new Date(transaction.created_at).toLocaleDateString()}</td>
                </tr>))}
          </tbody>
        </table>
      </TableContainer>
    </Container>
  </>);
};

export default Dashboard;
