
<FieldContainer required={true} title="Bank Account Name">
  <Field
    name="external_account.account_holder_name"
    type="text"
    help="What is the name associated with the bank account?"
    validate={[required, maxLength(64)]}
    component={Input}
  />
</FieldContainer>
<FieldContainer required={true} title="Bank Account Number">
  <Field
    name="account.number"
    type="text"
    help="What is the name of the clubs account?"
    validate={[required, maxLength(64)]}
    component={Input}
  />
</FieldContainer>
