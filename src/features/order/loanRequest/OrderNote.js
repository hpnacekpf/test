import React from 'react'
import Input from 'antd/lib/input'
import Feature from 'components/Feature'
import { htmlParseContent } from 'extensions/html'

const TextArea = Input.TextArea

const OrderNote = ({ data, handleChangeNote, icon }) => {
  const note = htmlParseContent(data.noteForLendor)
  return data.orderId ? (
    note ? (
      <Feature header="Notes for Lendor" icon={icon}>
        <p>{note}</p>
      </Feature>
    ) : null
  ) : (
    <Feature header="Notes for Lendor" icon={icon}>
      <TextArea
        name="note"
        placeholder="Notes for Lendor"
        value={note}
        autoSize={{ minRows: 4 }}
        onChange={(value) => handleChangeNote(value.target.value)}
      />
    </Feature>
  )
}

export default OrderNote
