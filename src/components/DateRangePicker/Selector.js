const React = require('react');
const moment = require('moment');
const PropTypes = require('prop-types');

const Icon = require('../Icon');

class Selector extends React.Component {
  static propTypes = {
    currentDate: PropTypes.number,
    handleNextClick: PropTypes.func,
    handlePreviousClick: PropTypes.func,
    setCurrentDate: PropTypes.func
  };

  render () {
    const styles = this.styles();

    return (
      <div style={styles.container}>
        <Icon
          elementProps={{ onClick: this.props.handlePreviousClick }}
          size={20}
          style={styles.calendarHeaderNav}
          type='caret-left'
        />
        <div>
          {this.props.currentDate}
        </div>
        <Icon
          elementProps={{ onClick: this.props.handleNextClick }}
          size={20}
          style={styles.calendarHeaderNav}
          type='caret-right'
        />
      </div>
    );
  }

  styles = () => {
    return {
      container: {
        display: 'flex'
      },
      calendarHeaderNav: {
        width: 35,
        cursor: 'pointer'
      }
    };
  }
}

class MonthSelector extends React.Component {
  static propTypes = {
    currentDate: PropTypes.number,
    setCurrentDate: PropTypes.func
  };

  _handlePreviousClick = () => {
    const currentDate = moment.unix(this.props.currentDate).startOf('month').subtract(1, 'm').unix();

    this.props.setCurrentDate(currentDate);
  };

  _handleNextClick = () => {
    const currentDate = moment.unix(this.props.currentDate).endOf('month').add(1, 'd').unix();

    this.props.setCurrentDate(currentDate);
  };

  render () {
    return (
      <Selector
        {...this.props}
        currentDate={moment(this.props.currentDate, 'X').format('MMMM')}
        handleNextClick={this._handleNextClick}
        handlePreviousClick={this._handlePreviousClick}
      />
    );
  }
}

class YearSelector extends React.Component {
  static propTypes = {
    currentDate: PropTypes.number,
    setCurrentDate: PropTypes.func
  };

  _handlePreviousClick = () => {
    const currentDate = moment.unix(this.props.currentDate).startOf('month').subtract(1, 'y').unix();

    this.props.setCurrentDate(currentDate);
  };

  _handleNextClick = () => {
    const currentDate = moment.unix(this.props.currentDate).endOf('month').add(1, 'y').unix();

    this.props.setCurrentDate(currentDate);
  };

  render () {
    return (
      <Selector
        {...this.props}
        currentDate={moment(this.props.currentDate, 'X').format('YYYY')}
        handleNextClick={this._handleNextClick}
        handlePreviousClick={this._handlePreviousClick}
      />
    );
  }
}


module.exports = {
  MonthSelector,
  YearSelector
};
