export type PromiseResValue<T extends Promise<any>> = T extends Promise<infer U> ? U : never

export async function catchTry<T extends Promise<any>>(promise: T): Promise<Error | PromiseResValue<T>> {
  try {
    const data = await promise
    return data
  } catch (err) {
    if (err instanceof Error) {
      return err
    }
    if (typeof err === 'string') {
      return new Error(err)
    }
    return new Error('There is some Error:' + JSON.stringify(err))
  }
}
