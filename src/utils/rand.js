/* eslint-disable no-plusplus */
export default function rand(length, current) {
  current = current || '';
  return length
    ? rand(
        --length,
        '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.charAt(Math.floor(Math.random() * 60)) + current
      )
    : current;
}
