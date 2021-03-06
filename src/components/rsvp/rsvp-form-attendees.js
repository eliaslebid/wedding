import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';

import { useFormContext, useFieldArray } from 'react-hook-form';

export const RsvpFormAttendees = ({ className }) => {
  const { register, control, errors } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: 'guests' });

  return (
    <div className={className}>
      <Button
        variant="primary"
        size="sm"
        onClick={() => append({ name: '' })}
        className="mb-3"
      >
        <FontAwesomeIcon icon={faPlusCircle} /> Add Guest
      </Button>

      {fields.map((item, idx) => (
        <Form.Group controlId={'name-' + item.id} key={item.id}>
          <Form.Label>Guest {idx + 1}</Form.Label>
          <InputGroup>
            <Form.Control
              ref={register}
              defaultValue={`${item.name}`}
              name={`guests[${idx}].name`}
              type="text"
              placeholder="Enter name"
              isInvalid={errors?.guests?.[idx]}
            ></Form.Control>
            <InputGroup.Append>
              <Button variant="danger" size="sm" onClick={() => remove(idx)}>
                <FontAwesomeIcon icon={faMinusCircle} />
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      ))}
    </div>
  );
};

RsvpFormAttendees.propTypes = {
  className: PropTypes.string
};
