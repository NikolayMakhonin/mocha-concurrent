import url from 'url'

export function loadModule(_path: string): Promise<any> | any {
  if (typeof require === 'function') {
    return require(_path)
  }
  return import(url.pathToFileURL(_path).toString())
}
