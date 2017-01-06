/* eslint import/no-unresolved: 0*/
import _ from 'lodash';
import I from 'immutable';
/**
 * 转换key到可用类型 pure
 * @param {array} array
 * @return {array} array
 */
/* eslint new-cap: 0*/
const mapKeys = (array) => I.Seq(array).map(
        (item) => {
          const ret = _.mapKeys(item, (v, k) => {
            if (_.isArray(v)) {
              return 'children';
            }
            if (k === 'id') {
              return 'value';
            }
            if (k === 'name') {
              return 'text';
            }
            return '';
          });
          if (ret.children) {
            ret.children = mapKeys(ret.children);
          }
          return ret;
        }
   ).toJS();
/**
 * 从tplData中去data impure
 * @param {string} type
 * @return {array} array
 */
/* eslint no-underscore-dangle: 0 , no-console: 0*/
export const tplData = (type) => {
  if (window._DATAAUTH_ && window._DATAAUTH_[type] && window._DATAAUTH_[type].auth && window._DATAAUTH_[type].auth.team) {
    return mapKeys(window._DATAAUTH_[type].auth.team);
  }
  console.warn('No Data, using default data. Check window._DATAAUTH_');
  return [];
};
/**
 * 从cookie中取初始值 impure
 * @param {string} name
 * @return {string} teamname
 */
export const getCookie = (name) => {
  let cStart;
  let cEnd;
  if (document.cookie.length > 0) {
    cStart = document.cookie.indexOf(`${name}=`);
    if (cStart !== -1) {
      cStart = cStart + name.length + 1;
      cEnd = document.cookie.indexOf(';', cStart);
      if (cEnd === -1) {
        cEnd = document.cookie.length;
      }
      return unescape(document.cookie.substring(cStart, cEnd));
    }
  }
  return '';
};
/**
 * 转换obj到可用string pure
 * @param {object} a
 * @param {object} b
 * @return {array} data
 */
const mapObjToArr = (a, b) => {
  if (_.isEmpty(a) || _.isEmpty(b)) {
    return [{
      value: '',
      text: '',
      children: [],
    }];
  }
  return _.map(a, (value) => {
    const ret = _.mapKeys(value, (v, k) => {
      if (_.includes(k, 'id') && _.isString(v)) {
        return 'value';
      }
      if (_.includes(k, 'name')) {
        return 'text';
      }
      if (_.isArray(v)) {
        return 'children';
      }
      return k;
    });
    ret.children = _.uniqBy(ret.children.map(
            (item) => ({
              value: item,
              text: b[item].partnername || b[item].aoiname,
            })
        ), 'value');
    return ret;
  });
};
/**
 * 从url结果中取data
 * @param {object} data
 * @param {string} type
 * @return {array} data
 */
export const UrlData = (data, type) => {
  if (_.isEmpty(data)) {
    return [];
  }
  const newData = data[_.keys(data)[0]];
  const ret = [{
    value: newData.teamname || '',
    text: newData.logistics_company || '',
    children: [{
      value: newData.cityid || '',
      text: newData.cityname || '',
      children: type === 'forward' ? mapObjToArr(newData.aois, newData.partners) : mapObjToArr(newData.partners, newData.aois),
    }],
  }];
  return ret;
};
