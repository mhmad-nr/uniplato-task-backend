import S from 'fluent-json-schema'

export const userByIdSchema = {
    body: S.null(),
    queryString: S.null(),
    params: S.object().prop("id", S.string().required()),
    headers: S.object(),
    
  };
export const signupSchema = {
    body: S.object(),
    queryString: S.object(),
    params: S.object(),
    headers: S.object(),
}