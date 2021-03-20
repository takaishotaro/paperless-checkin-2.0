import Header from "../components/Header";
import { Container } from 'reactstrap'
import Link from 'next/link'

const welcome = () => {
  return(
    <div>
      <Header/>
      <Container>
        <h3 className="mt-4 border-bottom">Paperless-Checkinとは？</h3>
        <p>Paperless-Checkinとは、宿泊施設がゲストに伝えるべき情報をWebを利用して伝えるためのWebアプリケーションです。</p>

        <h3 className="mt-4 border-bottom">使い方</h3>
        <ol>
          <li><Link href="/signup">Signup page</Link>で宿泊施設情報を登録します。</li>
          <li><Link href="/addNotices">addNotices page</Link>からゲストに注意を促す文を追加します。</li>
          <li><Link href="/addRoom">addRoom page</Link>から部屋を追加します。</li>
          <li><Link href="/dashbord">dashbord page</Link>からチェックイン時に、部屋と施設の情報が記載されたpageに遷移するQRコードを表示します。</li>
        </ol>
      </Container>
    </div>
  )
}

export default welcome