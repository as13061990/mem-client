import {
  Div,
  FixedLayout,
  Panel, PanelHeader, PanelHeaderBack, Spacing, Text,
} from '@vkontakte/vkui';
import { observer } from 'mobx-react-lite';
import '../css/rules.css'

export const Rules = observer(({ id }: IpanelProps) => {

  return (
    <Panel id={id} className='rules-panel'>
      <FixedLayout vertical='top'>
        <PanelHeader
          before={<PanelHeaderBack onClick={() => window.history.back()} />}
        >
          
        </PanelHeader>
      </FixedLayout>
      <Div>
        <Text className='rules-panel-text' weight='2'>
          Правила использования Сервиса Фабрика мемов
        </Text>
        <Spacing size={20} />
        <Text>
          1. Основные понятия
          <Spacing size={15} />
          1.1. Сайт – сайт, расположенный в сети Интернет по адресу https://vk.com/.

          <Spacing size={2} />
          1.2. Разработчик – физическое или юридическое лицо, размещающее приложение на Сайте и использующее его в соответствии с Условиями размещения приложений и Правилами размещения приложений на Сайте. Фамилия, имя и отчество либо наименование Разработчика, а также иная информация о нем указаны в разделе «Информация о разработчике» в окне запуска Приложения и в настройках Приложения.

          <Spacing size={2} />
          1.3. Администрация Сайта – общество с ограниченной ответственностью «В Контакте», расположенное по адресу: 191024, Санкт-Петербург, ул. Херсонская, д. 12-14, литер А, помещение 1-Н, ОГРН 1079847035179, ИНН 7842349892.

          <Spacing size={2} />
          1.4. Приложение – программный сервис, размещенный Разработчиком на Сайте в разделе «Приложения», прошедший модерацию Администрацией Сайта и включенный в каталог приложений.

          <Spacing size={2} />
          1.5. Пользователь – пользователь Сайта, зарегистрированный в установленном порядке и использующий Приложение.

          <Spacing size={20} />
          2. Статус Правил
          <Spacing size={20} />
          2.1. Настоящие Правила представляют собой соглашение между Разработчиком и Пользователем (далее вместе именуемые «Стороны») и регулируют права и обязанности Разработчика и Пользователя в связи с использованием Приложения.

          <Spacing size={2} />
          2.2. Настоящие Правила являются официальным типовым документом Разработчиков. Настоящие Правила применяются к указанным отношениям в случае, если Разработчик не утвердил и не применяет свои собственные Правила оказания услуг, ссылка на которые предоставляется Пользователям в окне запуска Приложения и в настройках Приложения.

          <Spacing size={2} />
          2.3. Действующая редакция Правил, являющихся публичным документом, разработана Администрацией Сайта и доступна любому пользователю сети Интернет при переходе по гипертекстовой ссылке «Правила оказания услуг разработчика приложения».
          Администрация Сайта вправе вносить изменения в настоящие Правила. При внесении изменений в Правила Администрация Сайта уведомляет об этом пользователей путем размещения новой редакции Правил на Сайте по постоянному адресу https://dev.vk.com/user-agreement не позднее, чем за [10] дней до вступления в силу соответствующих изменений. Предыдущие редакции Правил хранятся в архиве документации Администрации Сайта.

          <Spacing size={2} />
          2.4. Положения настоящих Правил рассматриваются как публичная оферта в соответствии со ст. 437 Гражданского кодекса Российской Федерации. Пользователь обязан полностью ознакомиться с настоящими Правилами до первого запуска Приложения. Запуск Приложения Пользователем означает полное и безоговорочное принятие Пользователем настоящих Правил в соответствии со ст. 438 Гражданского кодекса Российской Федерации. Положения настоящих Правил могут быть приняты только в целом без каких-либо изъятий.

          <Spacing size={2} />
          2.5. Ссылка на настоящие Правила после запуска Приложения доступна в настройках Приложения, во вкладке «Информация о разработчике». Пользователь обязан время от времени проверять текущую версию настоящих Правил в настройках Приложения на предмет внесения изменений и/или дополнений. Продолжение использования Приложения Пользователем после вступления в силу соответствующих изменений настоящих Правил означает принятие и согласие Пользователя с такими изменениями и/или дополнениями.

          <Spacing size={20} />
          3. Права и обязанности Сторон
          <Spacing size={20} />
          3.1. Пользователь обязан ознакомиться с информацией о Разработчике, политикой конфиденциальности Разработчика и настоящими Правилами до первого запуска Приложения. При несогласии с положениями указанных документов Пользователь обязан воздержаться от запуска и использования Приложения.

          <Spacing size={2} />
          3.2. Пользователь обязуется использовать Приложение в личных некоммерческих целях. Запрещается предлагать услуги, связанные с использованием Приложения, другим Пользователям в целях извлечения прибыли. Запрещается использование каких-либо автоматических скриптов («программы-роботы») или иных средств, позволяющих взаимодействовать с Приложением без участия Пользователя. Запрещается совершать действия, направленные на нарушение нормального функционирования Приложения, и использовать специальные программы, содержащие вредоносные компоненты («вирусы»).

          <Spacing size={2} />
          3.3. Разработчик вправе в любое время вносить изменения в функционал Приложения, интерфейс и/или содержание Приложения с уведомлением Пользователей или без такового.


          3.4. Разработчик вправе в одностороннем порядке устанавливать стоимость отдельных сервисов, предлагаемых Приложением, выраженную во внутренней валюте Приложений - голосах. Пользователь обязуется добросовестно использовать способы пополнения личного счета Пользователя в Приложении и дальнейшего использования голосов. При обнаружении Разработчиком фактов неправомерного пополнения личного счета Пользователя в Приложении Разработчик вправе отказать Пользователю в дальнейшем предоставлении услуг либо в одностороннем порядке уменьшить личный счет Пользователя в Приложении.

          <Spacing size={2} />
          3.5. Разработчик вправе запросить и использовать информацию о Пользователе исключительно в целях предоставления услуг по использованию Приложения. Использование информации о Пользователе регулируется политикой конфиденциальности Разработчика.

          <Spacing size={2} />
          3.6. Разработчик обязан обеспечить техническую поддержку Приложения и предоставить простой способ связи для обращений Пользователей по всем возникающим в процессе использования Приложения вопросам в разделе «Помощь» и в настройках Приложения, во вкладке «Информация о разработчике».

          <Spacing size={20} />
          4. Интеллектуальная собственность
          <Spacing size={20} />
          4.1. Пользователь признает, что Приложение, его интерфейс и содержание (включая, но не ограничиваясь, элементы дизайна, текст, графические изображения, иллюстрации, видео, скрипты, программы, музыка, звуки и другие объекты и их подборки, связанные с Приложением) защищены авторским правом, товарными знаками, патентами и иными правами, которые принадлежат Разработчику или иным законным правообладателям.

          <Spacing size={2} />
          4.2. Разработчик предоставляет Пользователю неисключительную лицензию на использование Приложения, а именно на запуск и дальнейшую эксплуатацию Приложения исключительно в целях удовлетворения личных, семейных, домашних или иных не связанных с предпринимательской деятельностью нужд, без права передачи данной лицензии третьим лицам и без права предоставления сублицензий на использование Приложения третьим лицам.

          <Spacing size={2} />
          4.3. Пользователь не вправе воспроизводить, копировать, изменять, уничтожать, перерабатывать (включая выполнение любого перевода или локализации), продавать, сдавать в прокат, опубликовывать, скачивать, иным образом распространять Приложение либо его компоненты, декомпилировать или иным образом пытаться извлечь исходный код компонентов Приложения, являющихся программным обеспечением, а также изменять функционал Приложения без предварительного письменного согласия Разработчика.
          <Spacing size={2} />

          4.4. Пользователь не вправе удалять и/или изменять какую-либо информацию, размещенную Разработчиком в рамках Приложения, в том числе знаки охраны авторского права и средств индивидуализации.
          <Spacing size={2} />

          4.5. Лицензия, указанная в пункте 4.2 настоящих Правил, предоставляется на весь срок использования Приложения Пользователем. Данная лицензия распространяется также на все обновления и/или дополнительные компоненты Приложения, которые могут быть созданы и предоставлены Разработчиком в будущем.
          <Spacing size={2} />

          4.6. Если иное явным образом не установлено в настоящих Правилах, ничто в настоящих Правилах не может быть рассмотрено как передача исключительных прав на Приложение и/или его компоненты Пользователю.
          <Spacing size={20} />

          5. Гарантии и Ответственность
          <Spacing size={20} />
          5.1. Пользователь признает и соглашается с тем, что Приложение предоставляется на условиях «как есть». Разработчик не предоставляет гарантий в отношении последствий использования Приложения, взаимодействия Приложения с другим программным обеспечением.
          <Spacing size={2} />

          5.2. Разработчик не предоставляет гарантий того, что Приложение может подходить для конкретных целей использования. Пользователь признает и соглашается с тем, что результат использования Приложения может не соответствовать ожиданиям Пользователя.
          <Spacing size={2} />

          5.3. Разработчик или иные правообладатели ни при каких обстоятельствах не несут ответственность за любой косвенный, случайный, неумышленный ущерб (включая упущенную выгоду, ущерб, причиненный утратой данных), вызванный в связи с использованием Приложения или невозможностью его использования, в том числе в случае отказа работы Приложения или иного перерыва в использовании Приложения, даже если Разработчик предупреждал или указывал на возможность такого ущерба.
          <Spacing size={2} />

          5.4. Пользователь самостоятельно несет ответственность за свои действия по использованию Приложения, в том числе за действия по размещению и передаче информации, комментариев, изображений и иных материалов другим Пользователям с помощью Приложения. Пользователь самостоятельно несет ответственность за соблюдение прав третьих лиц, применимого законодательства, настоящих Правил, каких-либо правил и/или обязательных инструкций Разработчика, размещенных в разделе «Помощь» Приложения, при использовании Приложения.
          <Spacing size={2} />

          5.5. За нарушения, допущенные Пользователем, Разработчик вправе отказать Пользователю в дальнейшем предоставлении услуг или ограничить такое предоставление полностью или частично с уведомлением Пользователя или без такового.
          <Spacing size={20} />

          6. Заключительные положения
          <Spacing size={20} />
          6.1. Пользователь вправе в любой момент отказаться от предоставления услуг посредством удаления Приложения со своей персональной страницы на Сайте.
          <Spacing size={2} />

          6.2. Разработчик вправе в любой момент приостанавливать или прекращать функционирование Приложения с уведомлением Пользователей или без такового.
          <Spacing size={2} />

          6.3. Настоящие Правила регулируются и толкуются в соответствии с законодательством Российской Федерации. Вопросы, не урегулированные Правилами, подлежат разрешению в соответствии с законодательством Российской Федерации.
          <Spacing size={2} />

          6.4. В случае возникновения любых споров или разногласий, связанных с исполнением настоящих Правил, Разработчик и Пользователь приложат все усилия для их разрешения путем проведения переговоров между ними. В случае, если споры не будут разрешены путем переговоров, споры подлежат разрешению в порядке, установленном действующим законодательством Российской Федерации.
          <Spacing size={2} />

          6.5. Настоящие Правила составлены на русском языке и могут быть предоставлены Пользователю для ознакомления на другом языке. В случае расхождения русскоязычной версии Правил и версии Правил на ином языке, применяются положения русскоязычной версии настоящих Правил.
          <Spacing size={2} />

          6.6. Если по тем или иным причинам одно или несколько положений настоящих Правил будут признаны недействительными или не имеющими юридической силы, это не оказывает влияния на действительность или применимость остальных положений.
          <Spacing size={2} />
        </Text>
      </Div>

    </Panel>
  );
})