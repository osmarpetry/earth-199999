import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import ContentLoader from 'react-content-loader';

import responsive from 'core/assets/styles/responsive';

import ButtonHeart, { HeartIcon } from 'components/ButtonHeart';
import ItemWithDescription from 'components/ItemWithDescription';

import { ReactComponent as HQLogo } from 'assets/icones/book/Group@1,5x.svg';
import { ReactComponent as MovieLogo } from 'assets/icones/video/Shape@1,5x.svg';
import { Hero } from 'containers/HeroDetails/model';
import sizes from 'core/assets/styles/sizes';

const Img = styled.img`
  height: 340px;
  width: 310px;

  @media only screen and (max-width: ${responsive.mobile}) {
    height: 100%;
    width: 100%;
    align-self: center;
  }
`;

interface HeroDetailsProps {
  disabled: boolean;
  favorited: boolean;
  loading?: boolean;
  hero?: Hero;
  lastRelease: string;
  handleButtonClick: (favorited: boolean, heroId: number) => void;
}

export default function HeroDetails({
  hero,
  favorited,
  disabled,
  loading = false,
  lastRelease,
  handleButtonClick,
}: HeroDetailsProps) {
  const ReleaseDateSkeleton = () => (
    <ItemWithDescription
      itemName="Último lançamento"
      description={
        <ContentLoader
          height={sizes.lineHeightParagraph}
          width="170px"
          style={{ borderRadius: '3px', paddingRight: '10px' }}
        >
          <rect width="100%" height="100%" />
        </ContentLoader>
      }
    />
  );

  if (loading) {
    return (
      <>
        <ContentLoader style={{ borderRadius: '3px' }}>
          <rect width="100%" height="310px" />
        </ContentLoader>
        <div className="left">
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              paddingBottom: '20px',
            }}
          >
            <ContentLoader
              height={sizes.h1Size}
              style={{ borderRadius: '3px', paddingRight: '10px' }}
            >
              <rect width="100%" height="100%" />
            </ContentLoader>
            <span
              style={{
                display: 'flex',
                justifyContent: 'center',
                width: 'fit-content',
              }}
            >
              <HeartIcon
                fill="rgba(255, 0,0,0.6)"
                stroke={'rgba(255, 0,0,0.6)'}
              />
            </span>
          </span>
          <ContentLoader
              width='100%'
            height={'170px'}
            style={{ borderRadius: '3px', paddingRight: '10px' }}
          >
            <rect width="100%" height="100%" />
          </ContentLoader>
          <div style={{ marginTop: '15px' }}>
            <div style={{ display: 'flex' }}>
              <div style={{ marginRight: '50px' }}>
                <ItemWithDescription
                  itemName="Quadrinhos"
                  hasTwoLines
                  description={
                    <ContentLoader
                      height={sizes.lineHeightParagraph}
                      width="40px"
                      style={{ borderRadius: '3px', paddingRight: '10px' }}
                    >
                      <rect width="100%" height="100%" />
                    </ContentLoader>
                  }
                  descriptionLogo={<HQLogo />}
                />
              </div>
              <ItemWithDescription
                itemName="Eventos"
                hasTwoLines
                description={
                  <ContentLoader
                    height={sizes.lineHeightParagraph}
                    width="40px"
                    style={{ borderRadius: '3px', paddingRight: '10px' }}
                  >
                    <rect width="100%" height="100%" />
                  </ContentLoader>
                }
                descriptionLogo={<MovieLogo />}
              />
            </div>
            <div style={{ marginTop: '10px' }}>
              <ReleaseDateSkeleton />
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        {hero?.thumbnail && (
          <Img
            style={{ borderRadius: '5px' }}
            src={hero?.thumbnail.path + '.' + hero?.thumbnail.extension}
            alt={hero.name}
          />
        )}
      </div>
      <div className="left">
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <h1>{hero?.name}</h1>
          <ButtonHeart
            value={favorited}
            disabled={disabled}
            onClick={() => handleButtonClick(favorited, hero?.id || 0)}
          />
        </span>
        <p>
          {hero?.description
            ? hero?.description
            : `No description availble to: ${hero?.name} D=`}
        </p>

        {hero && (
          <div style={{ marginTop: '15px' }}>
            <div style={{ display: 'flex' }}>
              <div style={{ marginRight: '50px' }}>
                <ItemWithDescription
                  itemName="Quadrinhos"
                  hasTwoLines
                  description={hero?.comics.available}
                  descriptionLogo={<HQLogo />}
                />
              </div>
              <ItemWithDescription
                itemName="Eventos"
                hasTwoLines
                description={hero?.events.available}
                descriptionLogo={<MovieLogo />}
              />
            </div>
            <div style={{ marginTop: '10px' }}>

            {lastRelease ? (
                <ItemWithDescription
                  itemName="Último lançamento"
                  description={format(
                    new Date(lastRelease) || new Date(),
                    'dd MMM. yyyy'
                  )}
                />
            ) : (
              <ReleaseDateSkeleton />
            )}
          </div>
          </div>

        )}
      </div>
    </>
  );
}
