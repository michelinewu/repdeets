import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout'
import gapi from 'https://apis.google.com/js/api.js'

export default function NYIndex() {

  return (
    <Layout>
    <Head>
        <title>New York Representatives</title>
      </Head>
      <h1>New York Representatives</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </Layout>
  )
}
