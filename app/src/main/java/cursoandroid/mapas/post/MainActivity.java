    package cursoandroid.mapas.post;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;

import java.util.ArrayList;
import java.util.List;

import cursoandroid.mapas.post.api_retrofit.interfaces.DataService;
import cursoandroid.mapas.post.api_retrofit.model.Localizacao;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;


public class MainActivity extends AppCompatActivity {
    private Button btn;

    private Retrofit retrofit;
    private String baseUrl;
    private List<Localizacao> localizacoes = new ArrayList<>();
    private Localizacao userLocation = new Localizacao( 4,-20.7170429230, -46.6259422302);

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        baseUrl = "http://localhost:3333/locations/";
        retrofit = new Retrofit.Builder()
                .baseUrl(baseUrl)
                .addConverterFactory(GsonConverterFactory.create())
                .build();
    }

    public void buscar(View v){
        buscarLocalizacao();
    }

    public void buscarLocalizacao(){

        DataService service = retrofit.create(DataService.class);
        Call<List<Localizacao>> call = service.buscarLocalizacao(userLocation);
        call.enqueue(new Callback<List<Localizacao>>() {
            @Override
            public void onResponse(Call<List<Localizacao>> call, Response<List<Localizacao>> response) {
                if(response.isSuccessful()){
                    localizacoes = response.body();
                    // exibicão
                    for (int i = 0; i < localizacoes.size(); i++){
                        Localizacao l = localizacoes.get(i);
                        Log.d("retorno", "resultado " + l.toString());
                    }
                }
            }

            @Override
            public void onFailure(Call<List<Localizacao>> call, Throwable t) {
                Log.d("retorno", "erro-> " + t.getMessage());
            }
        });
    }
}

