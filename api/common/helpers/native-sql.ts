export async function executeNativeSql(connector: any, sql: string, params: any[]): Promise<any> {
  return new Promise<any>((resolve, reject)=> {
    connector.execute(sql, params, function (error: Error, rows: []) {
      if (error) {
        reject(error);
      } else {
        resolve(rows);
      }
    })
  }).catch(error =>{
    console.log(error);
  });
}
