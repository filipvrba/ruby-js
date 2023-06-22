# Table Users

V tomto tutoriálu si ukážeme jak si vytvořit webový
projekt pomocí lešení a přidání nového elementu.
Element bude vykreslovat tabulku s informacemi
uživatelů, které máme uložené v json souboru.
Jedná se jednoduchý projekt a proto nebudeme
vytvářet nic složitěšího pro stylizaci.

## 1 New Project

Abychom začali vyvíjet, tak potřebujeme nástroj
RubyJS-Vite a proto se ujistěte, že již tento
nástroj vlastníte od verze 2.0.0. Pomocí příkazu
využijeme plugin 'scaffold' a vytvoříme projekt
s názvem 'tutorial_table_users'. Ujistěte se,
že vychozí adresář je nastaven na ploše.
Tam se bude nacházet již vytvořený webový projekt.

Zde je celkový příkaz pro nastavení adresáře a
vytvoření webového projektu:

```bash
cd ~/Desktop &&
rjsv scaffold web tutorial_table_users
```

Po vytvoření nám terminál oznamuje, že projekt
je již vytvořen a můžeme k němu přistoupit do
adresáře a spustit server. Pokud tak učiníme
tak se nám spustí server a dostaneme url adresu
na které si web můžeme prohlédnout. Pokud
na webu vydíte 'Hello RubyJS', tak vám správně
funguje server s RubyJS-Vite nástrojem.

Zde je příkaz pro spuštění serveru:

```bash
cd tutorial_table_users &&
bin/server
```

## 2 Creating an Element

Již máme vytvořený webový projekt a do ně vytvoříme
nový element pomocí 'scaffold' pluginu. Tento plugin
má argument jménem 'element' a jako parametr napíšeme
jméno elementu. Element pojmenujeme 'table_users' a
necháme ho vytvořit. Po vytvoření nám terminál oznámí
že modifikaci souborů a jméno elementu, který použijeme
v HTML syntaxi.

Zde je příkaz pro výtvoření nového elementu:

```bash
rjsv scaffold element table_users
```

### 2.1 Importing Elements

Aby server rozpoznal vytvořené elementy, tak je
zapotřebí naimportovat knihovnu, která inicializuje
elementy. Jedná se o 'src/rb/elements.js.rb' soubor.
To uskutečníme tím, že si otevřeme 'src/rb/main.js.rb'
soubor a zde napíšeme importaci potřebného souboru.

Zde je příklad scriptu:

```ruby
# src/rb/main.js.rb

import '../css/style.css'

import './elements'
#...
```

Po vložení importu uložíme soubor a server hned zareaguje.
Od teď můžeme elementy vkládat do HTML syntaxe a jsou
nezávazné.

## 3 Element Table Users

Teď je zapotřebí aby element byl v HTML. To učiníme tak,
že pomocí 'innerHTML' v souboru 'main.js.rb'
vložíme DOM označení 'elm-table-users'. Tím se nám
bude spouštět script v 'elm_table_users.js.rb'.
Následně script budeme modifikovat a budeme používat jednu
metodu s názvem 'init_elm()'. Je zapotřebí mít nějaká data
uživatelů. Proto si vytvoříme soubor 'users.json'
a vložíme mu nějaká data. Tyto data budeme otevírat pomocí
importu a převádět je do HTML syntaxe. Tím si vytvoříme
tabulku, kterou si ještě upravíme podle uhlednější stylizace
pomocí 'style.css' souboru.

### 3.1 Inner HTML

Takže, prvně si upravíme 'src/rb/main.js.rb' soubor a do
innerHTML vložíme DOM označení našeho již vytvořeného
elementu.

Zde je script řešení:

```ruby
# src/rb/main.js.rb

#...
document.querySelector('#app').innerHTML = "<elm-table-users></elm-table-users>"
```

### 3.2 Json

Další potřebnou záležitostí pro vykreslování dat je
json soubor. Proto zde bude vypsán kontent uživatelů
které se vloží do 'src/json/users.json' souboru.
Následně jej importujeme nad třídou ElmTableUsers,
aby jsme měli tyto data přítomná v
'src/rb/elements/elm_table_users.js.rb' souboru.

### 3.2.1 Users Content

Tento vypsaný kontent se uloží do
'src/json/users.json' souboru.
Proto je zapotřebí aby se povytvářela
potřebná složka, či soubor.

```json
{
  "users": [
    {
      "company": "Alfreds Futterkiste",
      "contact": "Maria Anders",
      "country": "Germany"
    },
    {
      "company": "Centro comercial Moctezuma",
      "contact": "Francisco Chang",
      "country": "Mexico"
    },
    {
      "company": "Ernst Handel",
      "contact": "Roland Mendel",
      "country": "Austria"
    }
  ]
}
```

### 3.2.2 Import Content

Kontent nakonec naimportujeme tak, aby server
rozpoznal, že se jedná o JSON soubor. To učiníme tím,
že za soubor připíšeme příponu. Import vložíme do
'elm_table_users.js.rb' souboru, takže
jej musíme modifikovat. Importaci zabalíme pod
'usersObj' jménem.

Modifikace by měla vypadat takto:

```ruby
# src/rb/elements/elm_table_users.js.rb

import 'usersObj', '../../json/users.json'

export default class ElmTableUsers < HTMLElement
#...
```

### 3.3 Init Element

Aby se nám vše vykreslovalo, tak je zapotřebí
modifikovat inicializaci elementu. Proto v
'elm_table_users.js.rb' souboru
budeme modifikovat 'init_elm()' funkci a upravíme
proměnou pro vykreslení tabulky. Aby tabulka
měla nějaká data, tak vytvoříme anonymní funkci,
která bude vytvářet vnořený element pro tabulku.

### 3.3.1 Template

Začneme tím, že si připravíme templátu.
Templáta bude obsahovat název a tabulku ze třemi
sloupci. Sloupce budou mít vlastní název a nebudou
prázdné.

Modifikace 'init_elm()' funkce bude následujicí:

```ruby
# src/rb/elements/elm_table_users.js.rb

#...
def init_elm()
  template = """
  <h1>Users</h1>
  <table>
    <tr>
      <th>Company</th>
      <th>Contact</th>
      <th>Country</th>
    </tr>
  </table>
  """

  self.innerHTML = template
end
#...
```

### 3.3.2 Anonymous Function

Abychom vložili data z 'users.json' souboru,
tak otevřeme jeho kontent a začnem prozkoumávat
uživatele. Prozkoumávání probíhá přes loop, který
nám dává jednoho uživatele a můžeme s jeho daty
manipulovat. Takže je budeme dávat do templáty,
která je určená pro vnoření informací pro daný
sloupec zvlášť. Anonymní funkce bude vracet
HTML kontent s již připravenými elemety.
Tato anonymní funkce, je zapotřebí vyvolat
uvnitř základní templáty a to pod 'tr' značení
která má uvnitř jména sloupců. Vše zmíněné se
opět modifikuje v 'init_elm()' funkce.

Další modifikace 'init_elm()' funkce:

```ruby
# src/rb/elements/elm_table_users.js.rb

#...
def init_elm()
  l_tr_users = lambda do
    dom_elements = []
    users_obj.users.each do |user|
      template = """
      <tr>
        <td>#{user.company}</td>
        <td>#{user.contact}</td>
        <td>#{user.country}</td>
      </tr>
      """
      dom_elements << template
    end
    dom_elements.join("\n")
  end

  template = """
  <h1>Users</h1>
  <table>
    <tr>
      <th>Company</th>
      <th>Contact</th>
      <th>Country</th>
    </tr>
    #{l_tr_users()}
  </table>
  """

  self.innerHTML = template
end
#...
```

### 3.4 Stylization

Pokud máte zapnutý server a prohlížíte si webový projekt
v prolížeči, tak vidíte uspořádané data s
uživateli. Není zde stylizace, která by byla přehlednější.
Tento problém vyřešíme jednoduše tím, že budeme modifikovat
'style.css' soubor a přidáme mu hodnoty pro table, td, th a tr.

```css
/* src/css/style.css */

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #bababa;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
```

## 4 Conclusion

Pokud uložíme css soubor, tak se hned zobrazí změna
a můžeme vidět, uhlednější stylizaci tabulky. Pokud
se jakýkoliv soubor změní (pokud je naimportován),
tak server zaznamenává změnu a hned restartuje server.
Jedná se o rychlí okamžik, že ani nepostřehneme, že
se server restartoval. Což je velká výhoda pro vývoj
webového projektu.

RubyJS-Vite je nástrojem, který dobře komunikuje s Vite
nástrojem a to v reálném čase. Kouzlo spočívá v tom, že
při zapnutí serveru, se zapne RubyJS-Vite na pozatí a
rozpoznává veškerou aktivitu událostí souborů v definované
cestě kde jsou uloženy RB soubory. Pokud existuje událost
tak RubyJS transformuje script do JS souboru a Vite nástroj,
rozpoznává veškeré soubory s JS syntaxí a ten komunikuje ze
serverem.

Co se týče 'scaffold' pluginu, tak by měla napomáhat
k rychlejšímu vyvoji projektu. Vyzkoušeli jsme si
v tomtu tutoriálu, jak vytvářet element a nemuseli jsme
oběvovat nové kolo tím, že se nemusí psat veškerý script,
který se neustále opakuje, pokud chceme mít v webovém
projektu více elementů.