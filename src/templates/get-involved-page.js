import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import { Card } from 'react-bootstrap';
import { WhereToStay } from '../components/get-involved/WhereToStay';
import { ImageHeader } from '../components/ImageHeader';

export const GetInvolvedPageTemplate = ({
  title,
  content,
  contentComponent,
  featuredImage,
  where_to_stay
}) => {
  const PageContent = contentComponent || Content;

  return (
    <section className="section">
      <ImageHeader image={featuredImage}>
        <h1>{title}</h1>
      </ImageHeader>
      {/* <h2 className="title text-primary">{title}</h2> */}
      <Card>
        <Card.Body>
          <PageContent className="content" content={content} />
        </Card.Body>
      </Card>
      <WhereToStay {...where_to_stay} className="mt-4" />
    </section>
  );
};

GetInvolvedPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func
};

const GetInvolvedPage = ({ data }) => {
  const { markdownRemark: page } = data;

  return (
    <Layout>
      <GetInvolvedPageTemplate
        contentComponent={HTMLContent}
        title={page.frontmatter.title}
        content={page.html}
        featuredImage={page.frontmatter.featuredImage}
        where_to_stay={page.frontmatter.where_to_stay}
      />
    </Layout>
  );
};

GetInvolvedPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default GetInvolvedPage;

export const getInvolvedPageQuery = graphql`
  query GetInvolvedPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        featuredImage
        where_to_stay {
          heading
          hotels {
            name
            distance
            address
            notes
          }
        }
      }
    }
  }
`;
