import { Injectable } from '@nestjs/common'
import axios from 'axios'
import { load } from 'cheerio'
// import pretty from 'pretty'
import Movie from 'src/types/Movie'

@Injectable()
export class PlayingService {
  private readonly setRegionUrl =
    'https://m.21cineplex.com/gui.list_theater.php?sid=&city_id='
  private readonly playingUrl = 'https://m.21cineplex.com/index.php?sid='

  async getPlayings(cityId: number) {
    const response = await axios.get(this.setRegionUrl + cityId)
    const cookie = response.headers['set-cookie'].join(';')
    const { data: html } = await axios.get(this.playingUrl, {
      headers: {
        cookie,
      },
    })

    const $ = load(html)

    const playings: Movie[] = []

    $('.grid_movie').each((idx, el) => {
      const movie: Movie = {
        id: null,
        title: null,
        type: null,
        rating: null,
        bannerUrl: null,
      }

      movie.id = $(el).find('img').attr('id')
      movie.title = $(el).find('.title').text()
      movie.type = $(el).find('.rating > span').text()
      movie.rating = $(el).find('.rating > a').text()
      movie.bannerUrl = $(el).find('img').attr('src')

      playings.push(movie)
      // console.log(idx + 1, $(el).html())
    })
    return playings
    // console.log(pretty($.html()))
  }
}