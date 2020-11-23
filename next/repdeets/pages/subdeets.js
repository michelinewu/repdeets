import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'

import React from 'react'

const Subdeets = (props) => {

  return (

    <div>
       <Layout>
         <Head>
             <title>New York Representatives</title>
         </Head>
         <h1>SUBDEETS</h1>
         {/* {reps.map((official) => (
          <div>
            <div>Role: {official.role}</div>
            <div>Name: {official.name}</div>
            <div>Twitter: @{official.channels.map((channel) => {
              if (channel.type === "Twitter") return channel.id})}
            </div>
            <br />
          </div>
        ))} */}
        <h2>
          <Link href="/">
            <a>Back to home</a>
          </Link>
        </h2>
      </Layout>
    </div>
  );
};

export default Subdeets
