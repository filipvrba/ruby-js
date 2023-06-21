# Plugins

Jedná se o rozšiřovací prvek CLI aplikace. Pokud
je vložen plugin do kořenového projektu, tak RubyJS
rozpozná existenci pluginu ve složce 'plugins'.
Vše se spouští pomocí příkazu 'rjsv' a s názvem
pluginu. Pokud si nejsme jistí jak se jmenuje plugin,
tak se doporučuje použít příkaz pro zobrazení nápovědy.
Ten vytiskne všechny argumenty samotné aplikce s i pluginy.

Zde je příkaz pro zobrazení nápovědy:

```bash
rjsv -h
```

## 1 Location

Jak jsem se už zmínil, plugin se umišťuje do složky 'plugins',
který je umíštěn v kořenové složce projektu. Jako projekt se bere
vše, kde se dá spustit RubyJS aplikace. Jako samotný RubyJS-Vite
projekt, má již vlasntí plugin s názvem 'scaffold'. Takže,
lze jej využít neustále kde je to potřeba.

Jako příklad zde uvedu stromovou strukturu složek:

```txt
A
└── plugins
    ├── markdown
    └── vue
B
└── plugins
    ├── docs
    └── react
```

> ### Info
> Pluginy jsou vůči projektům relativní.
> Pokud projekt A má specifický plugin,
> tak v projektu B tento plugin neuvidíte.

## 2 Development

Pokud se vyvíjí projekt s RubyJS a je potřeba změnit chod
funkcí, tak je potřeba vytvořit specifický plugin.
Abychom vytvořili plugin, tak je potřeba znát několik
kritérií, abychom dokázali inicializovat v CLI aplikaci.

Zde je seznam kritérií, které se mají dodržovat:

1. Strukturace složek tak, aby vše bylo pod jménem
  pluginu ve složce 'lib'.
2. Inicializace se provádí v souboru 'init.rb'.
  V němž je napsána třída 'Init', která dědí již připravenou
  abstraktní třídu 'RSJV::Plugin'.
3. Třída 'Init' je vnořená v modulech, které naznačují,
  že se jedná o plugin s daným názvem.
4. Třída 'Init' se bere jako reprezentační obsahový úryvek
  pluginu. Zde mají být napsány importované scripty a
  abstraktní funkce mají být zabaleny, tak aby spouštěli funkce
  z různých knihoven (zde by neměla být žádná logika).
5. Název pluginu se automaticky sepisuje podle názvu modulu,
  který by měl být třetím vnořeným.

### 2.1 Criteria

Popsal jsem v základu 5 krytérií, které se mají dodržovat a
to při vytváření vlastního pluginu. Abychom tomu lépe porozuměli,
tak zde více rozepíšu každou kritérii zvlášť.

### 2.1.1 Folder Structure

Struktura složek je potřebná pro lepší organizaci knihoven.
Proto je podstatné dbát aby vlastní plugin byl ve složce plugins a
následně ve složce pod vlastním jménem. Ten by měl vlastnit
složku knihoven a v něm inicializační soubor. RubyJS
rozpoznává tuto strukturaci a předem ví, že zde nalezne,
všechny důležité informace, či funkce, které se budou spouštět.

Zde je ukázka stromové strukturace:

```txt
.
└── plugins
    └── <plugin name>
        └── lib
            └── init.rb
```

### 2.1.2 Initialization File

Inicializace se provádí v souboru 'init.rb'.
V němž je napsána třída 'Init', která dědí již připravenou
abstraktní třídu [RSJV::Plugin](#1-7-lib/rjsv/plugin).
Tuto abstraktní třídu je potřeba znát a to hlavně
kvůli abstraktním metodám. Metody by měli být definované
ve třídě a vyplněné.

Jsou to tyto abstraktní metody:

- **description** krátký popis pluginu, který bude
  vytištěn při nápovědě.
- **arguments** inicializace argumentů, pokud je spuštěn
  plugin.
- **init** inicializační metoda, která spustí logiku
  funkcí pluginu. Je podobná metodě jako main().

Zde je ukázka vypsané třídy:

```ruby
# lib/init.rb

class Init < RJSV::Plugin
  def description
  end

  def arguments
  end

  def init()
  end
end
```

### 2.1.3 Nesting Modules

Je potřeba dbát pozornost na strukturu modulů,
při vytváření pluginu. Aby RubyJS dokázal rozpoznat
vlastní plugin, vyhledává všechny třídy v modulu
RJSV::Plugins. Pokud v něm nejsou, tak nedokáže
rozpoznat, že se jedná o plugin.

Proto by inicializační soubor měl vypadat podobně:

```ruby
# lib/init.rb

module RJSV
  module Plugins
    module <PluginName>
      class Init < RJSV::Plugin
        # ...
      end
    end
  end
end
```

> ### Info
> Při vytváření knihoven pluginu, se má dodržovat
> též struktura modulů. Pokud se nedodržuje, je možný
> konflikt funkcí z různých pluginů, nebo či samostatné
> RubyJS aplikace.

### 2.1.4 Representative Content Snippet

Zjednodušeně řečeno, inicializační soubor je něco jako
obsah knihy. Pokud tento soubor otevřeme, tak vidíme vše
co plugin obsahuje a co spouští za funkce, když se inicializeje.

Zde je příklad jak by měl vypadat inicializeční soubor,
pro scaffold plugin:

```ruby
module RJSV
  module Plugins
    module Scaffold
      require_relative './scaffold/cli/arguments'

      require_relative './scaffold/vite'
      require_relative './scaffold/states'
      require_relative './scaffold/create'

      class Init < RJSV::Plugin
        def initialize
          @arguments_cli = RJSV::Plugins::Scaffold::CLI::Arguments
        end

        def description
          "Scaffolding can create new\n" +
          "projects or create new elements."
        end

        def arguments
          @arguments_cli.init(self)
        end

        def init()
          Scaffold::States.create_web_state(@arguments_cli.options)
          Scaffold::States.create_element_state(@arguments_cli.options)
        end
      end
    end
  end
end
```

### 2.1.5 Plugin Name

Název pluginu se automaticky sepisuje z třetího modulu.
Proto je důležité třetí modul mít napsán. Takže metoda
[RJSV::Plugin.name()](#1-7-lib/rjsv/plugin) není abstraktní,
ale dá se přetížit.
Přetížení této funkce je vzácné, ale možné tehdy, pokud
chceme mít specifický název pluginu.

Zde je ukázka název třetího modulu:

```ruby
module RJSV
  module Plugins
    module Scaffold  # This is the 'scaffold' plugin name.
    #...
```

Nebo zde je ukázka přetížení metody name(),
která zkracuje název pluginu:

```ruby
module RJSV
  module Plugins
    module Scaffold
      #...
      class Init < RJSV::Plugin
        #...
        def name
          'scaf'
        end
        #...
      end
    end
  end
end
```