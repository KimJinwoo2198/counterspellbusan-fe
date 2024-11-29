import FaqCard from "../components/FaqCard"
export default () => {
  return (
    <article id="faq">
        <h1>FAQ</h1>
        <section>
            <FaqCard q="참가신청 방법은 어떻게 되나요?">
                https://counterspellbusan.com 에서 'Apply Now' 를 클릭해서 신청해주세요.
            </FaqCard>


            <FaqCard q="Counterspell 은 참가 비용이 있나요?">
                참가비용은 무료입니다!
            </FaqCard>


            <FaqCard q="팀 단위로 지원이 가능할까요?">
                가능합니다! 한 팀 당 최대 5인까지 참가 가능하며, 대시보드에서 팀 생성 후 직접 참가하시면 됩니다.
            </FaqCard>

            <FaqCard q="지원할 때 팀을 아직 구성하지 않았으면 어떻게 해야하나요?">
                최종합격이후 팀빌딩 세션이 대회전에 오프라인으로 진행됩니다.
            </FaqCard>
        </section>
        <p>더 궁금한것이 있으시다면 문의센터로 연락해주세요</p>
    </article>
  )
}
