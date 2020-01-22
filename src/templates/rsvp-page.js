import React from 'react';
import PropTypes from 'prop-types';
import { graphql, navigate } from 'gatsby';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import { RsvpForm } from '../components/rsvp/rsvp-form';
import { Card } from 'react-bootstrap';
import { RsvpContextProvider } from '../components/rsvp/RsvpContext';

export const RsvpPageTemplate = ({ title, content, contentComponent }) => {
  const PageContent = contentComponent || Content;

  return (
    <section className="section">
      <h2 className="title text-white">{title}</h2>
      <Card>
        <Card.Body>
          <Card.Title>
            <PageContent className="content" content={content} />
          </Card.Title>
          <RsvpForm
            onSubmit={() => navigate('/rsvp/thanks')}
          />
        </Card.Body>
      </Card>
    </section>
  );
};

RsvpPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  notesPlaceholder: PropTypes.string
};

const RsvpPage = ({ data }) => {
  const { markdownRemark: post } = data;

  const initialState = {
    notesPlaceholder: post?.frontmatter?.notesPlaceholder,
    attending_msg: post?.frontmatter?.attending_msg,
    not_attending_msg: post?.frontmatter?.not_attending_msg
  };

  return (
    <Layout>
      <RsvpContextProvider initialState={initialState}>
        <RsvpPageTemplate
          contentComponent={HTMLContent}
          title={post.frontmatter.title}
          content={post.html}
          // notesPlaceholder={post.frontmatter.notes_placeholder}
          // attending_msg={attending_msg}
          // not_attending_msg={not_attending_msg}
        />
      </RsvpContextProvider>
    </Layout>
  );
};

RsvpPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default RsvpPage;

export const rsvpPageQuery = graphql`
  query RsvpPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        notes_placeholder
        attending_msg
        not_attending_msg
      }
    }
  }
`;
