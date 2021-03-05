import { EarliestGameInfoType, Schedule } from '@type/Main';
import { SportTile } from '@components/index';
import { Col, Row, Spin } from 'antd';
import moment from 'moment';
import React from 'react';
import styles from './SportEntryActive.module.css';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { LongArrowIcon } from './SvgIcons';
import Markdown from 'react-markdown';
import { SportBetTypes } from '@constants/';

type PropsType = {
  title: string;
  games: EarliestGameInfoType[];
  loading: boolean;
  hideSection: boolean;
  showDetailsAt: boolean[];
  changeDetailsVisibleAt: (index: number) => void;
  hideDetailsAt: (index: boolean) => void;
};

function SportEntryActive({
  title,
  games,
  loading,
  hideSection,
  showDetailsAt,
  changeDetailsVisibleAt,
  hideDetailsAt
}: PropsType) {
  return (
    <div className={styles.earliest_games}>
      <div className={styles.earliest_games_titlebar}>
        <Row align="middle">
          {!hideSection && (
            <CaretDownOutlined className={styles.caret_down} onClick={() => hideDetailsAt(true)} />
          )}
          {hideSection && (
            <CaretUpOutlined className={styles.caret_up} onClick={() => hideDetailsAt(false)} />
          )}
          <strong>
            {title} ({games.length})
          </strong>
        </Row>
      </div>
      {hideSection && (
        <div className={styles.earliest_games_list}>
          {loading && (
            <Row justify={'center'}>
              <Col>
                <Spin />
              </Col>
            </Row>
          )}

          {!loading && games.length === 0 && <div className={styles.noData}>No Games</div>}
          {!loading &&
            games.length > 0 &&
            games.map((game: EarliestGameInfoType, index: number) => (
              <div className={styles.game} key={game.id}>
                <div className={styles.game_subinfo}>
                  <SportTile sport={game.sport.name} />
                  <span>{`Published at ${moment(game.publish_date).format('hh:mm A')} EST`}</span>
                </div>
                <div className={styles.game_info}>
                  <div className={styles.game_teams}>
                    {game.schedules.map((schedule: Schedule) => (
                      <>
                        <Row align="middle" className={styles.game_schedule_time}>
                          <img src="/images/seven-clock.png" alt="" />
                          <span>{`${moment(schedule.time).format('hh:mm A')} EST`}</span>
                        </Row>
                        <Row>
                          <div className={styles.game_team1}>
                            <img
                              src={schedule?.team.logo?.url || 'https://via.placeholder.com/100'}
                              alt="Team Logo"
                              className={styles.team_logo}
                            />
                            {game.sport.name !== 'UFC' && (
                              <span>{schedule.team.name}&nbsp;@&nbsp;</span>
                            )}
                            {game.sport.name === 'UFC' && (
                              <span>{schedule.team.name}&nbsp;vs&nbsp;</span>
                            )}
                          </div>
                          <div className={styles.game_team2}>
                            <img
                              src={
                                schedule.home_team?.logo?.url || 'https://via.placeholder.com/100'
                              }
                              alt="Team Logo"
                              className={styles.team_logo}
                            />
                            <span>{schedule.home_team.name}</span>
                          </div>
                        </Row>
                      </>
                    ))}
                    <Row align={'top'} wrap={false}>
                      <LongArrowIcon className={styles.long_arrow_icon} />
                      <span className={styles.desc_line}>
                        {`${game.bet_text} (${game.odds > 0 ? '+' : ''}${
                          game.odds
                        } odds | ${game.odds_decimal.toFixed(2)}x)`}
                      </span>
                    </Row>
                  </div>
                  <div className={styles.units}>
                    {game.type === SportBetTypes[2].id
                      ? 'Units N/A'
                      : `${game.units} Unit${game.units > 1 ? 's' : ''}`}
                  </div>
                </div>

                {game.detail && game.detail.length > 0 ? (
                  <>
                    <div
                      onClick={() => changeDetailsVisibleAt(index)}
                      className={styles.hide_details}>
                      <div className={styles.hide_details_btn}>
                        <span>View Details</span>
                        {showDetailsAt[index] && <CaretUpOutlined className={styles.caret_up} />}
                        {!showDetailsAt[index] && (
                          <CaretDownOutlined className={styles.caret_down} />
                        )}
                      </div>
                    </div>
                    {showDetailsAt[index] && (
                      <div className={styles.details_section}>
                        <Markdown source={game.detail} />
                      </div>
                    )}
                  </>
                ) : (
                  <div className={styles.border_line} />
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default SportEntryActive;
