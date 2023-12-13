'use client'
import styles from '@/app/page.module.css'
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddTitle() {
  const [empno, setEmpNo] = useState('');
  const [title, setTitle] = useState('');
  const [from_date, setFromDate] = useState('');
  const [to_date, setToDate] = useState('');
  const router = useRouter()

  const handleEmpNoChange = (event) => {
    setEmpNo(event.target.value);
  };
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleFromDateChange = (event) => {
    setFromDate(event.target.value);
  };
  const handleToDateChange = (event) => {
    setToDate(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await fetch('/api/add-title', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ empno, title, from_date, to_date })
      })

      router.refresh()
    } catch (error) {
      console.error(error)
    }

    setTitle('');
    setContent('');
  };

  return (
    <main className={styles.main}>
      <Link href={'/'}>View Title</Link>
      <h1>Add Title</h1>
      <form onSubmit={handleSubmit}>

        <div>
          <label htmlFor="empno">EmpNo:</label>
          <input
            type="text"
            id="empno"
            value={empno}
            onChange={handleEmpNoChange}
            required
          />
        </div>

        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="from_date">From Date:</label>
          <textarea
            id="from_date"
            value={from_date}
            onChange={handleFromDateChange}
            required
          />
        </div>

        <div>
          <label htmlFor="to_date">To Date:</label>
          <textarea
            id="to_date"
            value={to_date}
            onChange={handleToDateChange}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </main>
  )
}