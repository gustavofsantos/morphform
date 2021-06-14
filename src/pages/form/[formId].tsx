import { NextPageContext } from "next"

export default function FormPage({ formId }) {
  return (
    <main>
      <h1>Form page</h1>
    </main>
  )
}

export function getServerSideProps(ctx: NextPageContext) {
  return {
    props: {
      formId: ctx.query.formId
    }
  }
}
