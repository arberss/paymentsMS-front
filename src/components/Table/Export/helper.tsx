export const chunkData = (head: string[][], body: string[], size: number) => {
  const headVal = [...head[0].slice(40)];
  let res = [];

  for (let i = 0; i < body.length; i++) {
    const item = body[i];
    const last = res[res.length - 1];
    if (!last || last.length === size) {
      if (res.length >= 1) {
        const headToAdd = headVal.splice(0, 40);
        res.push(headToAdd);
      }
      res.push([item]);
    } else {
      last.push(item);
    }
  }
  return res;
};
