import Link from 'next/link';
import Title from './components/Title';
import styles from './page.module.css'
import prisma from '/lib/prisma'

async function getTitles(){
  const titles = await prisma.titles.findMany({
    where: {},
    take: 20,
  })
  return titles;
}

export default async function Home() {
  const titles = await getTitles();
  return (
    <main className={styles.main}>
      <Link href={'/add-title'}>Add Title</Link>
      <h1>Titles</h1>
      {
        titles.map((title) => {
          return (
            <Title
            key={title.emp_no}
            emp_no={title.emp_no}
            title={title.title}
            from_date={title.from_date.toString() }
            to_date={title.to_date.toDateString()}
            />
          )
        })
      }
    </main>
  )
}