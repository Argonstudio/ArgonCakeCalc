/* Copyright (C) 2026 Ivan Voitkov. ARGONCAKECALC-COMMERCIAL-1.0.
 * https://argon-studio.ru/ | https://github.com/Argonstudio/ArgonCakeCalc
 * Preserve author/origin attribution under section 7 of the Commercial Source-Available License; see ADDITIONAL_TERMS.md. */
/* Pure geometry. Dimensions: cm; density: g/cm³; mass: g. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.CakeModel = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, () => {
  'use strict';
const CakeI18n=globalThis.CakeI18n||(typeof require==='function'?require('./i18n.js'):null),T=CakeI18n.t;

  const coefficient = shape => shape === 'square' ? 1 : Math.PI / 4;
  const round = n => Math.round(n * 10) / 10;
  function positive(n, name) {
    if (!Number.isFinite(n) || n <= 0) throw new Error(T.l`${name}: требуется число больше нуля.`);
  }
  function volume(tier, shape) { return coefficient(shape) * tier.size ** 2 * tier.height; }
  function ledge(tiers, i) { return i ? Math.round((tiers[i - 1].size - tiers[i].size) * 50) / 100 : 0; }
  function solve({grams, count, height, margin, density, shape}) {
    positive(grams, T("Вес")); positive(height, T("Высота")); positive(density, T("Плотность"));
    if (!Number.isInteger(count) || count < 1 || count > 14) throw new Error(T("Допустимо от 1 до 14 ярусов."));
    if (!Number.isFinite(margin) || margin < 0) throw new Error(T("Отступ не может быть отрицательным."));
    // margin is the horizontal ledge on EACH side. Tiers touch vertically.
    // size[i] = topSize + 2 * margin * (count - 1 - i).
    const offsets = Array.from({length: count}, (_, i) => 2 * margin * (count - 1 - i));
    const k = coefficient(shape) * height * density;
    const massAt = top => k * offsets.reduce((sum, offset) => sum + (top + offset) ** 2, 0);
    if (grams < massAt(1) - 1e-7) {
      throw new Error(T.l`При этих параметрах минимальный вес — ${(massAt(1)/1000).toLocaleString('ru-RU', {maximumFractionDigits: 2})} кг (верхний ярус 1 см). Уменьшите число ярусов, высоту или отступ либо увеличьте вес.`);
    }
    let low = 1, high = Math.max(1, Math.sqrt(grams / k));
    for (let i = 0; i < 80; i++) {
      const mid = (low + high) / 2;
      if (massAt(mid) < grams) low = mid; else high = mid;
    }
    const top = (low + high) / 2;
    if (round(top + offsets[0]) > 1000) throw new Error(T("Размер нижнего яруса превышает 1000 см. Уменьшите вес или измените параметры."));
    return offsets.map(offset => ({size: round(top + offset), height}));
  }
  function totals(tiers, shape, density, portionMass) {
    const grams = tiers.reduce((sum, t) => sum + volume(t, shape) * density, 0);
    return {grams, height: tiers.reduce((sum, t) => sum + t.height, 0), portions: Math.floor((grams + 1e-7) / portionMass)};
  }
  function changeLedge(tiers, i, margin) {
    if (!i || !Number.isFinite(margin) || margin < 0) throw new Error(T("Укажите отступ не меньше нуля."));
    const delta = tiers[i - 1].size - 2 * margin - tiers[i].size;
    if (tiers.slice(i).some(t => round(t.size + delta) < 1)) throw new Error(T("Такой отступ уменьшит один из верхних ярусов ниже 1 см. Уменьшите отступ."));
    return tiers.map((t, index) => ({...t, size: index >= i ? round(t.size + delta) : t.size}));
  }
  return {coefficient, volume, solve, ledge, totals, changeLedge, round};
});
