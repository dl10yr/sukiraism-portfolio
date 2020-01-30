import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Scrollbars } from 'react-custom-scrollbars';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
import './term-style.css'


const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: 10,
  },
  textLeft: {
    textAlign: 'left',
  },
  paragraph: {
    marginTop: 10,
    marginBottom: 10,
  },
  h3: {
    marginBottom: 5,
    color: theme.palette.text.primary,

  },
  h2: {

    color: theme.palette.text.primary,

  },
  topsen: {
    margin: 30,
    textAlign: "left",
    color: theme.palette.text.primary,
  }
});


class Term extends React.Component {
  // constructor(props) {
  //   super(props);
  // }


  componentDidMount() {
  }

  render() {
    const { classes } = this.props;


    return (
      <Scrollbars>
        <h2 className={classes.h2}>利用規約</h2>
        <p className={classes.topsen}>この利用規約（以下、「本規約」といいます。）は、このWebサイトの管理者（以下、「管理者」といいます。）がこのWebサイト上で提供するサービス（以下、「本サービス」といいます。）の利用条件を定めるものです。本規約は、ユーザーと当サービス管理者との間の本サービスの利用に関わる一切の関係に適用されるものとします。本サービスを利用される方（以下、「利用者」）は、本規約の内容をご承諾いただいたものとみなしますので、以下の規定を守って利用してください。なお、本規約の内容は、必要に応じて変更することがありますので、ご利用の際には最新の利用規約をご覧ください。</p>
        <div className={classes.textLeft}>
          <Paper className={classes.root} elevation={1}>
            <Typography variant="headline" component="h3" className={classes.h3}>
              本サービスの利用
            </Typography>
            <Typography component="p" style={{ whiteSpace: 'pre-line' }}>
              管理者は、事前に利用者の投稿内容を閲覧することはしません。従って、投稿の内容（真偽、正確性、第三者の権利を侵害していないこと等）やサービス利用の状態については一切保証しておりません。本サービスのご利用は、利用者ご自身の責任において行っていただきます。
            </Typography>
          </Paper>
          <Paper className={classes.root} elevation={1}>
            <Typography variant="headline" component="h3" className={classes.h3}>
              免責事項
            </Typography>
            <Typography component="p" style={{ whiteSpace: 'pre-line' }}>
              利用者が本サービスの利用により第三者の権利を侵害し、または第三者に対して損害を与えたことに関連して生じた全ての苦情や請求について、管理者は損害賠償その他の責任を負いません。
            </Typography>
          </Paper>
          <Paper className={classes.root} elevation={1}>
            <Typography variant="headline" component="h3" className={classes.h3}>
              禁止行為
            </Typography>
            <Typography component="p" style={{ whiteSpace: 'pre-line' }}>
              本サービスでは以下の行為を禁止します。
            </Typography>
            <ol>
              <li>法令または公序良俗に違反する行為</li>
              <li>犯罪行為に関連する行為</li>
              <li>管理者、利用者、または第三者のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為</li>
              <li>管理者のサービスの運営を妨害するおそれのある行為</li>
              <li>他の利用者に関する個人情報等を収集または蓄積する行為</li>
              <li>不正アクセスをし、またはこれを試みる行為</li>
              <li>他の利用者に成りすます行為</li>
              <li>管理者のサービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為</li>
              <li>管理者、他の利用者または第三者の知的財産権、肖像権、プライバシー、名誉その他の権利または利益を侵害する行為</li>
              <li>以下の表現を含み、または含むと管理者が判断する内容を本サービス上に投稿し、または送信する行為</li>
              <ol>
                <li>過度に暴力的な表現</li>
                <li>露骨な性的表現</li>
                <li>人種、国籍、信条、性別、社会的身分、門地等による差別につながる表現</li>
                <li>自殺、自傷行為、薬物乱用を誘引または助長する表現</li>
                <li>その他反社会的な内容を含み他人に不快感を与える表現</li>
              </ol>
              <li>以下を目的とし、または目的とすると管理者が判断する行為</li>
              <ol>
                <li>営業、宣伝、広告、勧誘、その他営利を目的とする行為（管理者の認めたものを除きます。）</li>
                <li>性行為やわいせつな行為を目的とする行為</li>
                <li>面識のない異性との出会いや交際を目的とする行為</li>
                <li>他の利用者に対する嫌がらせや誹謗中傷を目的とする行為</li>
                <li>管理者、他の利用者、または第三者に不利益、損害または不快感を与えることを目的とする行為</li>
                <li>その他本サービスが予定している利用目的と異なる目的で本サービスを利用する行為</li>
                <li>宗教活動または宗教団体への勧誘行為</li>
                <li>その他、管理者が不適切と判断する行為</li>
              </ol>
            </ol>
          </Paper>
          <Paper className={classes.root} elevation={1}>
            <Typography variant="headline" component="h3" className={classes.h3}>
              利用制限及び登録抹消
            </Typography>
            <ol>
              <li>管理者は、利用者が以下のいずれかに該当する場合には、事前の通知なく、投稿内容を削除し、利用者に対して本サービスの全部もしくは一部の利用を制限しまたは利用者としての登録を抹消することができるものとします。</li>
              <ol>
                <li>本規約のいずれかの条項に違反した場合</li>
                <li>本サービスについて、最終の利用から一定期間利用がない場合</li>
                <li>その他、管理者が本サービスの利用を適当でないと判断した場合</li>
              </ol>
              <li>管理者は、本項に基づき、管理者が行った行為により利用者に生じた損害について、一切の責任を負いません。</li>
            </ol>
          </Paper>
          <Paper className={classes.root} elevation={1}>
            <Typography variant="headline" component="h3" className={classes.h3}>
              サービス内容の変更等
            </Typography>
            <Typography component="p" style={{ whiteSpace: 'pre-line' }}>
              管理者は、利用者に通知することなく、本サービスの内容を変更しまたは本サービスの提供を中止することができるものとし、これによって利用者に生じた損害について一切の責任を負いません。
            </Typography>
          </Paper>
          <Paper className={classes.root} elevation={1}>
            <Typography variant="headline" component="h3" className={classes.h3}>
              個人情報の取扱い
            </Typography>
            <Typography component="p" style={{ whiteSpace: 'pre-line' }}>
              管理者は、本サービスの利用によって取得する個人情報については、管理者「プライバシーポリシー」に従い適切に取り扱うものとします。
            </Typography>
          </Paper>
          <Paper className={classes.root} elevation={1}>
            <Typography variant="headline" component="h3" className={classes.h3}>
              通知または連絡
              </Typography>
            <Typography component="p" style={{ whiteSpace: 'pre-line' }}>
              ユーザーと本サービス管理者との間の通知または連絡は、当サービス提供者の定める方法によって行うものとします。
              </Typography>
          </Paper>
          <Paper className={classes.root} elevation={1}>
            <Typography variant="headline" component="h3" className={classes.h3}>
              権利義務の譲渡の禁止
            </Typography>
            <Typography component="p" style={{ whiteSpace: 'pre-line' }}>
              ユーザーは、当サービス管理者の書面による事前の承諾なく、利用契約上の地位または本規約に基づく権利もしくは義務を第三者に譲渡し、または担保に供することはできません。
            </Typography>
          </Paper>
          <Paper className={classes.root} elevation={1}>
            <Typography variant="headline" component="h3" className={classes.h3}>
              準拠法・裁判管轄
            </Typography>
            <Typography component="p" style={{ whiteSpace: 'pre-line' }}>
              本規約の解釈にあたっては，日本法を準拠法とします。また、本サービスに関して紛争が生じた場合には，当サービス提供者の所在地を管轄する裁判所を専属的合意管轄とします。
            </Typography>
          </Paper>
          <h2 className={classes.h2}>プライバシーポリシー</h2>
          <p className={classes.topsen}>本サービスでは以下のようにプライバシーポリシーを定めています。利用者は、本プライバシーポリシーの内容をご承諾いただいたものとみなします。</p>
          <Paper className={classes.root} elevation={1}>
            <Typography variant="headline" component="h3" className={classes.h3}>
              登録情報について
            </Typography>
            <Typography component="p" style={{ whiteSpace: 'pre-line' }}>
              本サービスでは、ログインに必要な利用者自らが所有するTwitter（http://twitter.com）のアカウント（以下、「Twitterアカウント」といいます。）に関する情報（アカウント名、アイコン画像URLなど）などの情報を保存しています。これらは本サービス利用の範囲内で管理者並びに管理者と契約関係にあるパートナー社（アクセス解析など）の間で利用されます。
            </Typography>
            <Typography component="p" style={{ whiteSpace: 'pre-line' }}>
              管理者は、事前に利用者の投稿内容を閲覧することはしません。従って、投稿の内容（真偽、正確性、第三者の権利を侵害していないこと等）やサービス利用の状態については一切保証しておりません。本サービスのご利用は、利用者ご自身の責任において行っていただきます。
            </Typography>
          </Paper>
          <Paper className={classes.root} elevation={1}>
            <Typography variant="headline" component="h3" className={classes.h3}>
              本サービスの利用
            </Typography>
            <Typography component="p" style={{ whiteSpace: 'pre-line' }}>
              お問い合わせの際に、メールアドレス等の個人情報をご登録いただく場合がございます。質問に対する回答や必要な情報を電子メールなどでご連絡する場合に利用させていただくものであり、個人情報をご提供いただく際の目的以外では利用いたしません。
            </Typography>
          </Paper>
          <Paper className={classes.root} elevation={1}>
            <Typography variant="headline" component="h3" className={classes.h3}>
              個人情報の第三者への開示
            </Typography>
            <Typography component="p" style={{ whiteSpace: 'pre-line' }}>
              本サービスでは、個人情報は適切に管理し、以下に該当する場合を除いて第三者に開示することはありません。
            </Typography>
            <ol>
              <li>利用者ご本人のご了解がある場合</li>
              <li>法令等への協力のため、開示が必要となる場合</li>
            </ol>
          </Paper>
          <Paper className={classes.root} elevation={1}>
            <Typography variant="headline" component="h3" className={classes.h3}>
              個人情報の開示、訂正、追加、削除、利用停止
            </Typography>
            <Typography component="p" style={{ whiteSpace: 'pre-line' }}>
              利用者ご本人からの個人データの開示、訂正、追加、削除、利用停止のご希望の場合には、ご本人であることを確認させていただいた上、速やかに対応させていただきます。
            </Typography>
          </Paper>
          <Paper className={classes.root} elevation={1}>
            <Typography variant="headline" component="h3" className={classes.h3}>
              プライバシーポリシーの変更について
            </Typography>
            <Typography component="p" style={{ whiteSpace: 'pre-line' }}>
              本サービスは、個人情報に関して適用される日本の法令を遵守するとともに、本ポリシーの内容を適宜見直しその改善に努めます。
            </Typography>
            <Typography component="p" style={{ whiteSpace: 'pre-line' }}>
              修正された最新のプライバシーポリシーは常に本ページにて開示されます。
            </Typography>
          </Paper>
          <iframe
            title="google-toiawase"
            src="https://docs.google.com/forms/d/e/1FAIpQLSdJu4ntlnrRXeUQynp0QWw1gMWEomfap_oN6GGrtqY8uI9xAg/viewform?embedded=true"
            width="400"
            height="500"
            frameborder="0"
            marginheight="0"
            marginwidth="0"
          >読み込んでいます…</iframe>
        </div>
      </Scrollbars>



    )
  }
}

// Redux関連
const mapStateToProps = (state, ownProps) => ({
  PostsListReducer: state.PostsListReducer,
});
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

// Material-uiのテーマ設定＋Redux設定
export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles, { withTheme: true })(Term)
);