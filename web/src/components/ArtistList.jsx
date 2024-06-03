import React from "react";
import { Card, Col, Row } from "antd";

const { Meta } = Card;

const ArtistList = ({ artists, onArtistClick }) => {
  console.log(artists);
  return (
    <Row gutter={[16, 16]}>
      {artists.map((artist) => (
        <Col xs={24} sm={12} md={8} lg={6} key={artist.id}>
          <Card
            hoverable
            cover={
              <img height={330} alt={artist.name} src={artist.images[0]?.url} />
            }
            onClick={() => onArtistClick(artist.id, artist.name)}
          >
            <Meta title={artist.name} />
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ArtistList;
