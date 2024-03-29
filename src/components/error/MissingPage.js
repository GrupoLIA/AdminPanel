import { Link } from 'react-router-dom';
import MissingPageStyled from './MissingPageStyles';

function MissingPage() {
  return (
    <MissingPageStyled>
      <div className="mainbox">
        <div className="err">4</div>
        <i className="far fa-question-circle fa-spin"></i>
        <div className="err2">4</div>
        <div className="msg">
          Maybe this page moved? Got deleted? Is hiding out in quarantine? Never
          existed in the first place? or maybe you are not worthy.
          <p>
            Anyhow, You can back <Link to="/">home</Link> and try from there.
          </p>
        </div>
      </div>
    </MissingPageStyled>
  );
}

export default MissingPage;
