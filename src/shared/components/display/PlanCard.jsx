import React from 'react'
import { Card } from 'antd'
import { Field } from 'redux-form'
import {
  CheckboxGroup
} from 'components/form_controls'
import './PlanCard.scss'

const PlanCard = ({ plan }) => (
  <Card bodyStyle={{ padding: 0 }}>
    <div className="plan-card-header">{plan.name}</div>
    <div className="plan-card-content">{plan.description}</div>
    <div className="plan-card-pricing">
      <Field
        name="selectedPlan"
        component={CheckboxGroup}
        options={plan.prices.map(p => ({
          label: `$${p.price} - ${p.duration}`,
          value: p._id
        }))}
      />
    </div>
  </Card>
)

export default PlanCard
