const BD_URL = import.meta.env.VITE_BD_URL
const API_KEY = import.meta.env.VITE_API_KEY

export async function getAllLabels() {
  try {
    const url = `${BD_URL}/labels`
    if (!BD_URL) return

    const result = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ['apikey']: API_KEY,
      },
    })
    const status = await result.json()
    return status
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message)
    throw new Error('Error inesperado')
  }
}
