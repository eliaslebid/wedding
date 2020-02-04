import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Card } from 'react-bootstrap';

export const EventItem = ({ title, start, end, location, address, body }) => {
  const formattedDate = format(new Date(start), 'MMM dd, yyyy');
  const startTime = format(new Date(start), 'HH:MM');
  const endTime = format(new Date(end), 'HH:MM');

  const gMapUrl = `https://www.google.com/maps/search/?api=1&query=${location},${address}`;
  const encUrl = encodeURI(gMapUrl);

  return (
    <Card>
      <Card.Header as="h4">{title}</Card.Header>
      <Card.Body>
        <Card.Title>
          {formattedDate}
          <br />
          <small>
            {startTime}–{endTime}
          </small>
        </Card.Title>
        <address className="pt-1">
          {location && <div>{location}</div>}
          {address.split('\n').map((item, key) => {
            return (
              <React.Fragment key={key}>
                {item}
                <br />
              </React.Fragment>
            );
          })}

          {address && (
            <div>
              <small>
                [
                <a href={encUrl} target="_blank" rel="noopener noreferrer">
                  Map
                </a>
                ]
              </small>
            </div>
          )}
        </address>
        {body && <div class="body">{body}</div>}
      </Card.Body>
    </Card>
  );
};

EventItem.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  location: PropTypes.string,
  address: PropTypes.string,
  description: PropTypes.string,
  featuredevent: PropTypes.string,
  featuredimage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  body: PropTypes.string
};

export default EventItem;
