
export interface IJwt {
    generateJWT(_id: string, name: string): {accessTkn: string, refreshTkn: string};
    verifyJWT(token: string, type: string): Promise<string> ;
}
  
